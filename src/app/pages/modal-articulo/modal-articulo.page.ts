import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonButton, IonInput, IonTitle, ModalController, ToastController } from '@ionic/angular';
import db from '../../../environments/environment';
import {User} from 'src/app/shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.page.html',
  styleUrls: ['./modal-articulo.page.scss'],
})
export class ModalArticuloPage implements OnInit {

  articuloForm: FormGroup;
  user: firebase.default.User;
  title: string;
  
  // Datos que obtenemos de la página ofertas-articulos
  uid: string;
  nombre: string;
  ingredientes: string;
  alergenos: string;
  precio: number;

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

    // Título para nuevo artículo
    this.title = "Nuevo Artículo";

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

    // Intentamos recoger el uid si nos lo mandan
    if(typeof(this.uid) != 'undefined'){
      db.collection('articulos').doc(this.uid).get().then(doc =>{
        this.nombre = doc.data().nombre;
        this.ingredientes = doc.data().ingredientes;
        this.alergenos = doc.data().alergenos;
        this.precio = doc.data().precio;
      })

      // Título para cuando se edita el artículo
      this.title = 'Editar Artículo';

    }

  }

  // Validación del formulario
  validate(name: string, ingredients: string, alergies: string, price: string): Boolean{  
    let ok = true;

    // Comprobamos que se han rellenado todos los campos
    if(name == "" || ingredients == "" || alergies == "" || price == ""){
      
      ok = false;

      // Pedimos al usuario que revise los inputs
      this.presentToast('Debe rellenar todos los campos');

    } 

    // Comprobamos que el precio es un número 
    if(isNaN(parseInt(price)) && ok == true){
      ok = false;

      // Pedimos al usuario que revise el precio
      this.presentToast('El precio debe ser un número');
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
      let uid = this.user.uid;
      // console.log(uid)
      
      // Añadimos el artículo a la colección de artículos
      db.collection('articulos').add({
        uidAsador: uid,
        nombre: name,
        ingredientes: ingredients,
        alergenos: alergies,
        precio: price
      });

      // Limpiamos los inputs
      this.clearInputs();

      // Cerramos el modal
      this.dismissModal();

      // Mostramos un mensaje para informar al usuario
      this.presentToast('Artículo añadido correctamente a la Base de Datos');  
      
    }
  }

  // Actualizar artículo
  updateArticulo(name: string, ingredients: string, alergies: string, price: string){
    // console.log('Nombre:', name, 'Ingredientes:', ingredients, 'Alérgenos:', alergies, 'Precio:', price);

    // Validación de los inputs
    let ok = this.validate(name, ingredients, alergies, price);

    if(ok){
      // Modificamos el artículo de la colección de artículos
      db.collection('articulos').doc(this.uid).update({
        nombre: name,
        ingredientes: ingredients,
        alergenos: alergies,
        precio: price
      })

      // Cerramos el modal
      this.dismissModal();

      // Limpiamos los inputs
      this.clearInputs();

      // Mostramos un mensaje para informar al usuario
      this.presentToast('Artículo modificado correctamente');  
      
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

  // Obtener el tipo
  getType(variable){
    return typeof(variable)
  }

}
