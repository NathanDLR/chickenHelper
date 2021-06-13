import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Articulo } from 'src/app/classes/articulo';
import { Asador } from 'src/app/classes/asador';
import { Oferta } from 'src/app/classes/oferta';
import { Pedido } from 'src/app/classes/pedido';
import db from '../../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  // Lista de asadores
  asadores: Asador[];

  // Lista de ofertas y artículos
  ofertas: Oferta[];
  articulos: Articulo[];

  // Lista del pedido
  pedido: any[];
  concepto: string[];

  minutes: number[];
  total: number;

  constructor(private fireAuth: AngularFireAuth, private alert: AlertController, private toast: ToastController, private router: Router) { }

  ngOnInit() {

    this.minutes= [0, 15, 30, 45];
    this.total = 0;

    // Inicializar el array
    this.asadores = [];
    this.ofertas = [];
    this.articulos = [];
    this.pedido = [];
    this.concepto= [];

    // Cargamos los asadores
    db.collection('users').where('tipo', '==', 0).onSnapshot(snap =>{

      // Vacíamos el array para que no se dupliquen los datos
      this.asadores = [];

      snap.forEach(snapHijo => {

        // Datos del asador
        let uid = snapHijo.id
        let nombre = snapHijo.data().displayName;

        // Objeto asador
        let asador = new Asador(uid, nombre);

        // Lo introducimos en el array
        this.asadores.push(asador);

      })
    })

  }

  // Cargar los artículos y ofertas del asador
  loadOfertasArticulos(id: string){
    
    // Cada vez que se cambie de asador borramos la lista de pedido y el total
    this.deleteOrder();

    this.fireAuth.user.subscribe(data => {

      // Vacíamos ambas listas
      this.ofertas = [];
      this.articulos = [];

      // Cargamos las ofertas 
      db.collection('ofertas').where('uidAsador', '==', id).onSnapshot(snap => {
        snap.forEach(snapHijo => {

          // Obtenemos los datos de la oferta
          let uid = snapHijo.id;
          let nombre = snapHijo.data().nombre;
          let articulos = snapHijo.data().articulos;
          let precio = snapHijo.data().precio;
          let uidAsador = snapHijo.data().uidAsador;

          // Creamos un nuevo objeto oferta
          let oferta = new Oferta(uid, nombre, articulos, precio, uidAsador);

          // Lo introducimos en nuestro array
          this.ofertas.push(oferta);

        });
      });

      // Cargamos los artículos
      db.collection('articulos').where('uidAsador', '==', id).onSnapshot(snap => {
        snap.forEach( doc =>{
          
          // Creamos un nuevo objeto oferta
          let articulo = new Articulo(doc.id, doc.data().nombre, doc.data().ingredientes, doc.data().alergenos, doc.data().precio, doc.data().uidAsador);

          // Lo Añadimos a nuestro array
          this.articulos.push(articulo);

        });
      });
    });

  }

  // Añadir al pedido un artículo u oferta
  add(id: string, nombre: string, precio: string){
    // Añadimos el id a la lista concepto para luego mandarlo a la bd
    this.concepto.push(id);

    this.pedido.push({id, nombre, precio})

    // Añadimos el precio al total
    this.total += parseFloat(precio);

  }

  // Hacer pedido
  order(cliente:string, uid:string, hora:string, info: string){

    // Datos que necesitamos: Cliente, concepto, fecha, hora, horaCorta, info, recogido, total y uidAsador
    let date = new Date(hora).toTimeString().substring(0, 5);
    let ok: boolean = false

    // Primero comprobamos si el asador puede aceptar el pedido
    db.collection('pedidos').where('uidAsador', '==', uid).where('horaCorta', '==', date).get().then(snap =>{
      
      // Mostramos un mensaje para que el cliente escoja otra hora
      if(snap.size >= 5){
        this.presentAlert('Lo sentimos', 'El asador no puede recibir más pedidos a la hora seleccionada, por favor, selecciona otra hora');
        ok = false
      }
      else ok = true;
    }).then(() => {
      
      // Si el asador puede recibir el pedido lo añadimos a su lista de pedidos
      if(ok){

        ok = this.validate(cliente, info, hora);

        if(ok){
          // Añadimos el pedido a la base de datos
            db.collection('pedidos').add({
            cliente: cliente,
            concepto: this.concepto,
            fecha: new Date(hora).toLocaleDateString(),
            hora: new Date(hora),
            horaCorta: date,
            info: info,
            recogido: false,
            total: this.total,
            uidAsador: uid
          });

          // Enviamos al cliente un correo en el que confirmamos todos los datos del pedido

          // Enviamos al cliente a una página en la que le confirmamos que se ha realizado su pedido
          this.router.navigate(['order-confirm']);
          
        }
      }
    });
  }

  // Validación de los datos del cliente y la hora
  validate(cliente: string, info: string, hora: string): boolean{

    let ok = true;

    // Comprobamos que se ha rellenado el nombre del cliente y la info extra
    if(cliente == "" || info == ""){
      ok = false;
      this.presentToast('Por favor, rellena los campos nombre e información extra');
    }

    // Comprobamos que se haya seleccionado hora
    if(ok && typeof(hora) == 'undefined'){
      ok = false;
      this.presentToast('Por favor, escoja una hora para recoger su pedido');
    }

    return ok;

  }

  // Borrar oferta/articulo del pedido
  delete(nombre: string, precio: string, uid: string){
    // Obtenemos el índice en el que se encuentra el elemento a borrar y lo eliminamos del array
    let i = this.pedido.indexOf(nombre);
    this.pedido.splice(i, 1);

    // Restamos el precio al total
    this.total -= parseFloat(precio);

    // Eliminamos el id de la lista de conceptos
    let ind = this.concepto.indexOf(uid);
    this.concepto.splice(ind, 1);

  }

  // Borrar el pedido para que el cliente pueda comenzar de nuevo
  deleteOrder(){
    this.pedido = [];
    this.total = 0;
    this.concepto = [];
  }

  // Presentar toast
  async presentToast(msg: string){
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });

    await toast.present();
  }

  // Presentar alert
  async presentAlert(title: string, msg: string){
    const alert = await this.alert.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

  }


}
