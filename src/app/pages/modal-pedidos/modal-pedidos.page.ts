import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, IonInput, IonLabel, IonSelect, ModalController, ToastController } from '@ionic/angular';
import { Articulo } from 'src/app/classes/articulo';
import { Oferta } from 'src/app/classes/oferta';
import { Pedido } from 'src/app/classes/pedido';
import db from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.page.html',
  styleUrls: ['./modal-pedidos.page.scss'],
})
export class ModalPedidosPage implements OnInit {

  pedidoForm: FormGroup;
  title: string;
  precio: string;
  user: firebase.default.User;
  minutes: number[]; 
  hours: number[];

  // Fecha y hora actual
  date= new Date().toLocaleDateString();
  timeNow = new Date().getHours();

  // Uid que obtenemos de la página pedidos
  uid: string;
  hora: Date;

  // Inputs del template para meterle los datos si editamos el pedido
  // Está hecho de forma diferente que en los artículos y ofertas porque no funcionaba así
  @ViewChild('hora') datePHora: IonDatetime;
  @ViewChild('concepto') conceptoSelect: IonSelect;
  @ViewChild('cliente') inputCliente: IonInput;
  @ViewChild('info') inputInfo: IonInput;
  @ViewChild('total') lblTotal: IonLabel;

  // Array para guardar las ofertas y artículos y mostrarlos en el select
  ofertasArticulos: any[];

  constructor(public modalControlller: ModalController, private fireAuth: AngularFireAuth, private toastCtlr: ToastController){
    // Datos del usuario actual
    fireAuth.user.subscribe((data => {
      this.user = data;
    }));
  }

  ngOnInit() {

    // Inicializar array
    this.ofertasArticulos = [];

    // Minutos que se muestran para escoger la hora del pedido
    this.minutes= [0, 15, 30, 45];

    // Valores de las horas que se muestran para recoger los pedidos
    this.hours = this.getHourValues();

    // Título para nuevo pedido
    this.title = "Nuevo Pedido";
    this.precio = "0";

    // Formulario en código
    this.pedidoForm = new FormGroup({
      hora: new FormControl('', [
        Validators.required
      ]),

      concepto: new FormControl('', [
        Validators.required
      ]),

      cliente: new FormControl('', [
        Validators.required
      ]),

      info: new FormControl('', [
        Validators.required
      ]),

      // No ponemos el total como input porque se calcula en base a los artículos y ofertas seleccionados
    })

    this.fireAuth.user.subscribe(data => {

        // uid asador
        let uidAsador = data.uid;

        // Obtenemos las ofertas y artículos solo del asador actual
        db.collection('ofertas').where('uidAsador', '==', uidAsador).onSnapshot( snap => {

        // Vacíamos el array para que no se dupliquen los datos
        this.ofertasArticulos = [];

        snap.forEach( snapHijo => {

          // Obtenemos los datos de la oferta
          let uid = snapHijo.id;
          let nombre = snapHijo.data().nombre;
          let articulos = snapHijo.data().articulos;
          let precio = snapHijo.data().precio;
          let uidAsador = snapHijo.data().uidAsador;

          // Creamos un nuevo objeto oferta
          let oferta = new Oferta(uid, nombre, articulos, precio, uidAsador);

          // Lo introducimos en nuestro array
          this.ofertasArticulos.push(oferta);

        })
      });

      db.collection('articulos').where('uidAsador', '==', uidAsador).onSnapshot( snap => {
        snap.forEach( snapHijo => {
          // Obtenemos los datos del artículo
          let uid = snapHijo.id;
          let nombre = snapHijo.data().nombre;
          let ingredientes = snapHijo.data().ingredientes;
          let alergenos = snapHijo.data().alergenos;
          let precio = snapHijo.data().precio;
          let uidAsador = snapHijo.data().uidAsador;

          // Creamos un nuevo objeto artículo
          let articulo = new Articulo(uid, nombre, ingredientes, alergenos, precio, uidAsador);

          // Lo introducimos en nuestro array
          this.ofertasArticulos.push(articulo);

        });
      });
    })

    // Intentamos recoger el uid si nos lo mandan
    if(typeof(this.uid) != 'undefined'){
      db.collection('pedidos').doc(this.uid).get().then(doc => {
        // Rellenamos los campos con los datos de la bd
        this.datePHora.value = this.hora.toString();
        this.conceptoSelect.value = doc.data().concepto;
        this.inputCliente.value = doc.data().cliente;
        this.inputInfo.value = doc.data().info;
      });

      // Título cuando se edita el pedido
      this.title = "Editar Pedido";
      
    }

  }

  // Añadir pedido
  addPedido(hora: string, concepto: string[], cliente: string, info: string){    
    // Precio total del pedido
    let total = 0;

    // Validamos los inputs
    let ok = this.validate(hora, concepto, cliente);

    // Si todo es correcto añadimos el pedido a la base de datos
    if(ok){
      
      // Obtenemos el uid para guardarlo en la colección
      let uid = this.user.uid;

      // Convertimos la hora a Date
      let date = new Date(hora);

      // Recorremos el array de artículos y ofertas para ir sumando los precios
      for(let i=0; i < concepto.length; i++){
        db.collection('ofertas').doc(concepto[i]).get().then(doc =>{
          if(typeof(doc.data()) != 'undefined'){
            let precio = doc.data().precio;
            total += parseFloat(precio);
          }
        });  
  
        db.collection('articulos').doc(concepto[i]).get().then(doc =>{
          if(typeof(doc.data()) != 'undefined'){
            let precio = doc.data().precio;            
            total += parseFloat(precio);  
          }
        }).then( () => {
          if(i == concepto.length - 1){
            // Añadimos el pedido a la colección
            db.collection('pedidos').add({
              uidAsador: uid,
              hora: date,
              horaCorta: date.toTimeString().substring(0, 5), // Añadimos este campo para que sea más fácil comprobar las horas disponibles para hacer los pedidos
              concepto: concepto,
              cliente: cliente,
              info: info,
              total: total,
              recogido: false,
              cardPayed: false,
              fecha: this.date
            });
          }
        })
      }   

      // Toast para informar al usuario
      this.presentToast("Pedido añadido correctamente");

      // Cerramos el modal 
      this.dismissModal();

    }

  }

  // Actualizar pedido
  updatePedido(hora: string, concepto: string[], cliente: string, info: string){
    // Precio total del pedido
    let total = 0;

    // Validamos los inputs
    let ok = this.validate(hora, concepto, cliente);

    if(ok){
      // Convertimos la hora a Date
      let date = new Date(hora);

      // Recorremos el array de artículos y ofertas para ir sumando los precios
      for(let i=0; i < concepto.length; i++){
        db.collection('ofertas').doc(concepto[i]).get().then(doc =>{
          if(typeof(doc.data()) != 'undefined'){
            let precio = doc.data().precio;
            total += parseFloat(precio);
          }
        });  
  
        db.collection('articulos').doc(concepto[i]).get().then(doc =>{
          if(typeof(doc.data()) != 'undefined'){
            let precio = doc.data().precio;            
            total += parseFloat(precio);  
          }
        }).then( () => {
          if(i == concepto.length - 1){
            // Modificamos el pedido
            db.collection('pedidos').doc(this.uid).update({
              hora: date,
              horaCorta: date.toTimeString().substring(0, 5), // Añadimos este campo para que sea más fácil comprobar las horas disponibles para hacer los pedidos
              concepto: concepto,
              cliente: cliente,
              info: info,
              total: total
            });
          }
        })
      }

      // Cerramos el modal
      this.dismissModal();

      // Mostramos un mensaje para informar al usuario
      this.presentToast('Pedido modificado correctamente'); 

    }
  }

  // Get hour values
  getHourValues(): number[]{
    // Array con los valores de las horas disponibles para recoger los pedidos
    let hourValues: number[] = [];
    
    // Usamos la hora actual para llenar el array con los valores adecuados
    for(let i = this.timeNow; i<= 24; i++) hourValues.push(i);

    return hourValues;
  }

  // Validación del formulario
  validate(hora: string, concepto: string[], cliente: string): Boolean{
    let ok = true;

    // Comprobamos que  los campos estén rellenos
    if(hora == "" || typeof(concepto) == 'undefined' || cliente == ""){
      this.presentToast("Debes rellenar los campos")
      ok = false
    }

    return ok;
  }

  // Dismiss modal
  dismissModal(){
    this.modalControlller.dismiss();
  }

  // Presentar un mensaje con un toast
  presentToast(msg: string){
    this.toastCtlr.create({
      animated: true,
      message: msg,
      duration: 2000,
      translucent: true
    }).then((obj) => {
      obj.present();
    });
  }

  // Obtener el tipo
  getType(variable){
    return typeof(variable)
  }

}
