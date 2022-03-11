import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, IonInput, ModalController, ToastController } from '@ionic/angular';
import db from '../../../environments/environment';


@Component({
  selector: 'app-modal-oferta',
  templateUrl: './modal-oferta.page.html',
  styleUrls: ['./modal-oferta.page.scss'],
})
export class ModalOfertaPage implements OnInit {

  ofertaForm: FormGroup;
  user: firebase.default.User;
  title: string;

  // Datos que obtenemos de la página ofertas-articulos
  uid: string;
  nombre: string;
  articulos: string;
  precio: number;

  // Textboxes del template
  @ViewChild('name') nameInput: IonInput;
  @ViewChild('articles') articlesInput: IonInput;
  @ViewChild('price') priceInput: IonInput;

  constructor(public alertController: AlertController, public modalController: ModalController, private fireAuth: AngularFireAuth, private toastCtrl: ToastController){

    // Datos del usuario actual
    fireAuth.user.subscribe(data => {
      this.user = data;
    });

  }

  ngOnInit() {

    // Título para oferta nueva
    this.title = "Nueva Oferta";

    // Formulario en código
    this.ofertaForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),

      articles: new FormControl('', [
        Validators.required
      ]),

      price: new FormControl('', [
        Validators.required
      ]),

      hasChicken: new FormControl('', [
        Validators.required
      ]),

      howManyChickens: new FormControl('', [
        Validators.required
      ])

    })

    // Intentamos recoger el uid si nos lo mandan
    if(typeof(this.uid) != 'undefined'){
      db.collection('ofertas').doc(this.uid).get().then(doc =>{
        this.nombre = doc.data().nombre;
        this.articulos = doc.data().articulos;
        this.precio = doc.data().precio;
      })

      // Título para cuando se edita el artículo
      this.title = 'Editar Oferta';

    }
  }

  // Validación del formulario
  validate(name: string, articles: string, price: string): Boolean{
    let ok = true;

    // Comprobamos que se han rellenado todos los campos
    if(name == "" || articles == "" || price == ""){
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

  // Añadir oferta
  addOferta(name: string, articles: string, price: string, hasChicken: string, howManyChickens: string){
    console.log(hasChicken, howManyChickens);
    // Validación de los inputs
    let ok = this.validate(name, articles, price);

    if(ok){

      // Obtenemos el uid para guardarlo en la colección, luego buscaremos las ofertas por el uid
      let uid = this.user.uid;

      // Añadimos la oferta a la colección de ofertas
      db.collection('ofertas').add({
        uidAsador: uid,
        nombre: name,
        articulos: articles,
        precio: price        
      });

      
      // Limpiamos los inputs
      this.clearInputs();  

      // Cerramos el modal
      this.dismissModal();  

      // Mostramos un mensaje para informar al usuario
      this.presentToast('Oferta añadida correctamente a la Base de Datos');  

    }
  }

  // Actualizar oferta
  updateOferta(name: string, articles: string, price: string){

    // Validación de los inputs
    let ok = this.validate(name, articles, price);

    if(ok){
      // Modificamos la oferta
      db.collection('ofertas').doc(this.uid).update({
        nombre: name,
        articulos: articles,
        precio: price
      });

      // Cerramos el modal
      this.dismissModal();

      // Limpiamos los inputs
      this.clearInputs();
 
      // Mostramos un mensaje para informar al usuario
      this.presentToast('Oferta modificada correctamente');  

    }
  }

  // Limpiar los textboxes
  clearInputs(){
    this.nameInput.value = "";
    this.articlesInput.value = "";
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

  // Dismiss modal
  dismissModal(){
    this.modalController.dismiss();
  }

  // Obtener el tipo
  getType(variable){
    return typeof(variable)
  }

}
