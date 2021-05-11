import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import db from '../../../environments/environment';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.page.html',
  styleUrls: ['./modal-articulo.page.scss'],
})
export class ModalArticuloPage implements OnInit {

  articuloForm: FormGroup

  constructor(public alertController: AlertController, public modalController: ModalController) { }

  ngOnInit() {
    // Formulario en código
    this.articuloForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),

      ingredients: new FormControl('', [
        Validators.required
      ]),

      alergies: new FormControl('',[
        Validators.required
      ]),

      price: new FormControl('', [
        Validators.required
      ])

    })
  }

  // Validación del formulario
  async validate(name: String, ingredients: String, alergies: String, price: number){

  }

  // Añadir artículo
  addArticulo(name: String, ingredients: String, alergies: String, price: number){
    console.log('Nombre:', name, 'Ingredientes:', ingredients, 'Alérgenos:', alergies, 'Precio:', price);
    
    // Añadimos el artículo a la colección de artículos
    db.collection('articulos').add({
      nombre: name,
      ingredientes: ingredients,
      alergenos: alergies,
      precio: price
    })

    // Limpiamos los inputs

    // Mostramos un mensaje para informar al usuario

  }

  dismissModal(){
    this.modalController.dismiss();
  }

}
