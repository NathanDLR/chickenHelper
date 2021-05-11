import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import db from '../../../environments/environment';
import {User} from 'src/app/shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.page.html',
  styleUrls: ['./modal-articulo.page.scss'],
})
export class ModalArticuloPage implements OnInit {

  user: firebase.default.User
  articuloForm: FormGroup

  constructor(public alertController: AlertController, public modalController: ModalController, private fireAuth: AngularFireAuth)
  { 
    fireAuth.user.subscribe((data => {
      this.user = data;
    }));
  }

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
  addArticulo(name: string, ingredients: string, alergies: string, price: string){
    console.log('Nombre:', name, 'Ingredientes:', ingredients, 'Alérgenos:', alergies, 'Precio:', price);
    
    // Añadimos el artículo a la colección de artículos
    let uid = this.user.uid
    console.log(uid)

    let collection = 'articulos' + uid

    db.collection(collection).add({
      nombre: name,
      ingredientes: ingredients,
      alergenos: alergies,
      precio: parseInt(price)
    })

    // Limpiamos los inputs

    // Mostramos un mensaje para informar al usuario

  }

  dismissModal(){
    this.modalController.dismiss();
  }

}
