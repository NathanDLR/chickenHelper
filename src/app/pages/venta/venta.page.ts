import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalVentaPage } from '../modal-venta/modal-venta.page';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  // Usuario actual
  user: firebase.default.User;

  // Array con la venta extra del día TODO: Array de Venta, no de any 
  venta: any[];

  constructor(public modalController: ModalController, private toastCtrl: ToastController, private fireAuth: AngularFireAuth, private alertCtrl: AlertController){

  }

  ngOnInit() {

    this.venta = [];

  }

  // Presentar modal venta
  async presentModalVenta(){
    const modal = await this.modalController.create({
      component: ModalVentaPage
    });

    return await modal.present();
  }

}
