import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import db from '../../../environments/environment';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  // Datos que se nos pasa de la página order
  uid: string;
  tipo: number;

  // Datos de la oferta/artículo
  name: string;
  precio: string;
  articulos: string; // Ofertas
  alergenos: string; // Articulos
  ingredientes: string; // Articulos

  constructor(private modal: ModalController){}

  ngOnInit(){

    // Obtenemos los datos de la oferta/artículo
    
    // Ofertas
    if(this.tipo == 0){ 
      db.collection('ofertas').doc(this.uid).get().then(doc => {
        this.name = doc.data().nombre;
        this.precio = doc.data().precio;  
        this.articulos = doc.data().articulos;
      });
    }

    // Articulos
    if(this.tipo == 1){
      db.collection('articulos').doc(this.uid).get().then(doc => {
        this.name = doc.data().nombre;
        this.precio = doc.data().precio;  
        this.alergenos = doc.data().alergenos;
        this.ingredientes = doc.data().ingredientes;
      });
    }
    


  }

  // Dismiss modal 
  dismiss(){
    this.modal.dismiss();
  }

}
