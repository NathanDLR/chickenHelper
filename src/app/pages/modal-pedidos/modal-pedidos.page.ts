import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, IonInput, IonLabel, IonSelect, ModalController } from '@ionic/angular';
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

  @ViewChild('concepto') conceptoSelect: IonSelect;
  @ViewChild('total') lblTotal: IonLabel;

  // Array para guardar las ofertas y artículos y mostrarlos en el select
  ofertasArticulos: any[];

  constructor(public modalControlller: ModalController, private fireAuth: AngularFireAuth){
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

    // Título para nuevo artículo
    this.title = "Nuevo Artículo";
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

    // Obtenemos las ofertas y artículos
    db.collection('ofertas').onSnapshot( snap => {

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
    })

    db.collection('articulos').onSnapshot( snap => {
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

  }

  // Añadir pedido
  addPedido(hora: string, concepto: string[], cliente: string, info: string){    
    // Precio total del pedido
    let total = 0;

    // Validamos los inputs
    let ok = this.validate(hora, concepto, cliente, info);

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
              concepto: concepto,
              cliente: cliente,
              info: info,
              total: total
            });
          }
        })
      }   

      // Toast para informar al usuario

      // Cerramos el modal 
      this.dismissModal();

    }

  }

  // TODO: Validación del formulario
  validate(hora: string, concepto: string[], cliente: string, info: string): Boolean{
    let ok = true;
    
    // Comprobamos que todos los campos estén rellenos


    return ok;
  }

  // Dismiss modal
  dismissModal(){
    this.modalControlller.dismiss();
  }

  //TODO: Presentar un mensaje con un toast
  presentToast(msg: string){

  }

}
