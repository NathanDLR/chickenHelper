import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalArticuloPage } from '../modal-articulo/modal-articulo.page';
import { ModalOfertaPage } from '../modal-oferta/modal-oferta.page';
import db from '../../../environments/environment';
import { Articulo } from 'src/app/classes/articulo';
import { Oferta } from 'src/app/classes/oferta';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-ofertas-articulos',
  templateUrl: './ofertas-articulos.page.html',
  styleUrls: ['./ofertas-articulos.page.scss'],
})
export class OfertasArticulosPage implements OnInit {

  // Listas de Ofertas y Artículos
  ofertas: Oferta[];
  articulos: Articulo[];

  // Usuario actual
  user: firebase.default.User;

  constructor(public modalController: ModalController, private toastCtrl: ToastController, private alertCtrl: AlertController, private fireAuth: AngularFireAuth) { }

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

  // Presentar modal oferta
  async presentModalOferta(){
    const modal = await this.modalController.create({
      component: ModalOfertaPage
    });

    return await modal.present();
  }

  // Presentar modal artículo
  async presentModalArticulo(){
    const modal = await this.modalController.create({
      component: ModalArticuloPage
    });

    return await modal.present();
  }

  // Eliminar un artículo
  async deleteArticulo(uid: string){
    // Preguntamos al usuario si está seguro de borrar el pedido
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: 'Vas a borrar este artículo y no lo podrás recuperar',
      buttons: [
        {
          text: 'Borrar',
          handler: () => {
            // Borramos el artículo e informamos al usuario
            db.collection('articulos').doc(uid).delete();
            this.presentToast("Artículo borrado correctamente");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();

  }

  // Eliminar una oferta
  async deleteOferta(uid: string){
    // Preguntamos al usuario si está seguro de borrar el pedido
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: 'Vas a borrar esta oferta y no la podrás recuperar',
      buttons: [
        {
          text: 'Borrar',
          handler: () => {
            // Borramos el documento que representa la oferta
            db.collection('oferta').doc(uid).delete();
            this.presentToast("Oferta borrada correctamente");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();

  }

  // Editar un artículo
  async editArticulo(uid: string){

    // Abrimos el modal artículo pero le pasamos el uid
    const modal = await this.modalController.create({
      component: ModalArticuloPage,
      componentProps: {
        'uid': uid
      }
    });

    return await modal.present();

  }

  // Editar una oferta
  async editOferta(uid: string){

    // Abrimos el modal oferta pero le pasamos el uid
    const modal = await this.modalController.create({
      component: ModalOfertaPage,
      componentProps: {
        'uid': uid
      }
    });
  
    return await modal.present();

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
