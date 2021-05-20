import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalArticuloPage } from '../modal-articulo/modal-articulo.page';
import { ModalOfertaPage } from '../modal-oferta/modal-oferta.page';
import db from '../../../environments/environment';
import { Articulo } from 'src/app/classes/articulo';


@Component({
  selector: 'app-ofertas-articulos',
  templateUrl: './ofertas-articulos.page.html',
  styleUrls: ['./ofertas-articulos.page.scss'],
})
export class OfertasArticulosPage implements OnInit {

  // Listas de Ofertas y Artículos
  ofertas: Articulo[];
  articulos: any[];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    // Inicializamos los arrays
    this.ofertas = [];
    this.articulos = [];
    
    // Añadimos los datos a nuestro array para trabajar con ellos
    db.collection('articulos').onSnapshot( snap => {

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

        // Lo introducimos en la base de datos
        this.articulos.push(articulo);

      })
    })

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
  deleteArticulo(uid: string){
    // console.log("Uid del artículo: ", uid);
    
    // Borramos el documento que representa el artículo 
    db.collection('articulos').doc(uid).delete();

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
  
}
