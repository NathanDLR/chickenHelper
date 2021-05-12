import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput, ModalController, ToastController } from '@ionic/angular';
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

  // Textboxes del template
  @ViewChild('name') nameInput: IonInput;
  @ViewChild('ingredients') ingredientsInput: IonInput;
  @ViewChild('alergies') alergiesInput: IonInput;
  @ViewChild('price') priceInput: IonInput;


  constructor(public alertController: AlertController, public modalController: ModalController, private fireAuth: AngularFireAuth, private toastCtrl: ToastController)
  { 
    // Datos del usuario actual
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
  validate(name: String, ingredients: String, alergies: String, price: string): Boolean{  
    let ok = true;

    if(name == "" || ingredients == "" || alergies == "" || price == "") ok = false

    try{
      parseInt(price);
    }
    catch(error){
      ok = false
    }
    
    return ok;
  }

  // Añadir artículo
  addArticulo(name: string, ingredients: string, alergies: string, price: string){
    // console.log('Nombre:', name, 'Ingredientes:', ingredients, 'Alérgenos:', alergies, 'Precio:', price);

    // Validación de los inputs
    let ok = this.validate(name, ingredients, alergies, price);

    if(ok){

      // Obtenemos el uid para guardarlo en la colección, así después podremos obtener todos los artículos por el uid
      let uid = this.user.uid
      // console.log(uid)
      
      // Añadimos el artículo a la colección de artículos
      let collection = 'articulos'

      db.collection(collection).add({
        uid: uid,
        nombre: name,
        ingredientes: ingredients,
        alergenos: alergies,
        precio: parseInt(price)
      })

      // Limpiamos los inputs
      this.clearInputs()

      // Mostramos un mensaje para informar al usuario
      this.presentToast();  
    }
    else{
      // Pedimos al usuario que revise los inputs

    }
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  // Limpiar los textboxes
  clearInputs(){
    this.nameInput.value = "";
    this.ingredientsInput.value = "";
    this.alergiesInput.value = "";
    this.priceInput.value = "";    
  }

  // Toast message
  presentToast(){
    this.toastCtrl.create({
      animated: true,
      message: 'Artículo añadido correctamente a la Base de Datos',
      duration: 2000,
      translucent: true,
    }).then((obj) => {
      obj.present();
    })
    
  }

}
