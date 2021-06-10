import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Articulo } from 'src/app/classes/articulo';
import { Asador } from 'src/app/classes/asador';
import { Oferta } from 'src/app/classes/oferta';
import db from '../../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  // Lista de asadores
  asadores: Asador[];

  // Lista de ofertas y artículos
  ofertas: Oferta[];
  articulos: Articulo[];

  constructor(private fireAuth: AngularFireAuth) { }

  ngOnInit() {

    // Inicializar el array
    this.asadores = [];
    this.ofertas = [];
    this.articulos = [];

    // Cargamos los asadores
    db.collection('users').where('tipo', '==', 0).onSnapshot(snap =>{

      // Vacíamos el array para que no se dupliquen los datos
      this.asadores = [];

      snap.forEach(snapHijo => {

        // Datos del asador
        let uid = snapHijo.id
        let nombre = snapHijo.data().displayName;

        // Objeto asador
        let asador = new Asador(uid, nombre);

        // Lo introducimos en el array
        this.asadores.push(asador);

      })
    })

  }

  // Cargar los artículos y ofertas del asador
  loadOfertasArticulos(id: string){
    
    this.fireAuth.user.subscribe(data => {

      // Vacíamos ambas listas
      this.ofertas = [];
      this.articulos = [];

      // Cargamos las ofertas 
      db.collection('ofertas').where('uidAsador', '==', id).onSnapshot(snap => {
        snap.forEach(snapHijo => {

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

        });
      });

      // Cargamos los artículos
      db.collection('articulos').where('uidAsador', '==', id).onSnapshot(snap => {
        snap.forEach( doc =>{
          
          // Creamos un nuevo objeto oferta
          let articulo = new Articulo(doc.id, doc.data().nombre, doc.data().ingredientes, doc.data().alergenos, doc.data().precio, doc.data().uidAsador);

          // Lo Añadimos a nuestro array
          this.articulos.push(articulo);

        })
      })


    })

  }

}
