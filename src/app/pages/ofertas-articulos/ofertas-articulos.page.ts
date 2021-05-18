import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalArticuloPage } from '../modal-articulo/modal-articulo.page';
import { ModalOfertaPage } from '../modal-oferta/modal-oferta.page';

@Component({
  selector: 'app-ofertas-articulos',
  templateUrl: './ofertas-articulos.page.html',
  styleUrls: ['./ofertas-articulos.page.scss'],
})
export class OfertasArticulosPage implements OnInit {

  // Listas de Ofertas y Artículos
  ofertas: any[];
  articulos: any[]

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    // Inicializamos los arrays
    this.ofertas = [];
    this.articulos = [];
  }

  async presentModalOferta(){
    const modal = await this.modalController.create({
      component: ModalOfertaPage
    });

    return await modal.present();
  }

  async presentModalArticulo(){
    const modal = await this.modalController.create({
      component: ModalArticuloPage
    });

    return await modal.present();
  }

  
}
