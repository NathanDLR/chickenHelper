import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Articulo } from 'src/app/classes/articulo';
import { Oferta } from 'src/app/classes/oferta';
import db from '../../../environments/environment';

@Component({
  selector: 'app-modal-venta',
  templateUrl: './modal-venta.page.html',
  styleUrls: ['./modal-venta.page.scss'],
})
export class ModalVentaPage implements OnInit {

  ventaForm: FormGroup;
  total: number = 0;

  // Array de ofertas y artículos
  oferta: Oferta[];
  articulos: Articulo[];
  ofertas: Oferta[];

  constructor(public modalControlller: ModalController, private fireAuth: AngularFireAuth, private toastCtlr: ToastController){}

  ngOnInit(){

    // Inicializar los arrays
    this.ofertas = [];
    this.articulos = [];

    // Formulario en código
    this.ventaForm = new FormGroup({
      oferta: new FormControl('', [
        Validators.required
      ]),

      articulo: new FormControl('', [
        Validators.required
      ])


    });

    // Obtenemos las ofertas y artículos
    db.collection('ofertas').onSnapshot( snap => {

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

      })
    });

    db.collection('articulos').onSnapshot( snap => {
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


  }

}
