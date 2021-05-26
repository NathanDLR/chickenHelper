import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput, IonSelect, ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/classes/articulo';
import { Oferta } from 'src/app/classes/oferta';
import { Pedido } from 'src/app/classes/pedido';
import db from '../../../environments/environment';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.page.html',
  styleUrls: ['./modal-pedidos.page.scss'],
})
export class ModalPedidosPage implements OnInit {

  pedidoForm: FormGroup;
  title: string;
  total: number = 0;

  @ViewChild('concepto') conceptoSelect: IonSelect;


  // Array para guardar las ofertas y artículos y mostrarlos en el select
  ofertasArticulos: any[];

  constructor(public modalControlller: ModalController) { }

  ngOnInit() {

    // Inicializar array
    this.ofertasArticulos = [];

    // Título para nuevo artículo
    this.title = "Nuevo Artículo";

    // Formulario en código
    this.pedidoForm = new FormGroup({
      hora: new FormControl('', [
        Validators.required
      ]),

      concepto: new FormControl('', [
        Validators.required
      ]),

      cliente: new FormControl('', [
        Validators.required
      ]),

      info: new FormControl('', [
        Validators.required
      ]),

      // No ponemos el total como input porque se calcula en base a los artículos y ofertas seleccionados
    
    })

    // Obtenemos las ofertas y artículos

    db.collection('ofertas').onSnapshot( snap => {

      // Vacíamos el array para que no se dupliquen los datos
      this.ofertasArticulos = [];

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
        this.ofertasArticulos.push(oferta);

      })
    })

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
        this.ofertasArticulos.push(articulo);

      });
    });

  }

  // Dismiss modal
  dismissModal(){
    this.modalControlller.dismiss();
  }

  // Select changed
  selectChanged(){
    // Actualizamos el precio total
    
  }

}
