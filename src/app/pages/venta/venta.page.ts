import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Articulo } from 'src/app/classes/articulo';
import { Oferta } from 'src/app/classes/oferta';
import db from '../../../environments/environment';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  // Usuario y fecha actual
  user: firebase.default.User;
  date = new Date().toLocaleDateString();

  // Array con la venta extra del día 
  ofertas: Oferta[];
  articulos: Articulo[];

  constructor(public modalController: ModalController, private toastCtrl: ToastController, private fireAuth: AngularFireAuth, private alertCtrl: AlertController){

  }

  ngOnInit() {

    // Inicializamos los arrays
    this.ofertas = [];
    this.articulos = [];

    this.fireAuth.user.subscribe(data => {

      // Datos del usuario actual
      this.user = data;
      let uid = this.user.uid;

      // Añadimos los datos a nuestro array de artículos para trabajar con ellos
      db.collection('articulos').where("uidAsador", "==", uid).onSnapshot( snap => {

        // Vacíamos el array para que no se dupliquen los datos
        this.articulos = [];

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
          this.articulos.push(articulo);

        });
      });

      // Añadimos los datos a nuestro array de ofertas para trabajar con ellos
      db.collection('ofertas').where("uidAsador", "==", uid).onSnapshot( snap => {

        // Vacíamos el array para que no se dupliquen los datos
        this.ofertas = [];

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
          this.ofertas.push(oferta);

        });
      });
    });
  }

  // Añadir precio
  add(precio: string){

    // id del doc
    let uid: string = "";

    // Total venta
    let total: number = 0;

    // Obtenemos el id del doc en el que guardamos la venta de hoy
    db.collection('venta').orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( (snap) => {
      snap.forEach(doc => {
        uid = doc.id;
        total = doc.data().total;
      })
    }).then(() => {
      // Sumamos al total el precio que se nos haya pasado y actualizamos el documento
      total += parseFloat(precio);

      if(uid == ""){
        // Creamos el documento y le metemos el precio que se nos ha pasado
        db.collection('venta').add({
          fecha: this.date,
          total: parseFloat(precio)
        });

      }
      else{
        // Luego actualizamos el total
        db.collection('venta').doc(uid).update({
          total: total
        });

        // Mensaje para informar al usuario
        this.presentToast("Se ha añadido la venta");
      }     

    });
  }

  // Toast message
  presentToast(message: string){
    this.toastCtrl.create({
      animated: true,
      message: message,
      duration: 2000,
      translucent: true,
    }).then((obj) => {
      obj.present();
    })
    
  }

  


}
