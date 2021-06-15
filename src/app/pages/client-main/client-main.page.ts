import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/classes/pedido';
import db from '../../../environments/environment';

@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.page.html',
  styleUrls: ['./client-main.page.scss'],
})
export class ClientMainPage implements OnInit {

  // Usuario actual y sus datos
  user: firebase.default.User;
  nombre: string;

  // Lista de pedidos
  pedidos: Pedido[];

  constructor(private fireAuth: AngularFireAuth, private router: Router){}

  ngOnInit(){
    // Inicializamos los arrays
    this.pedidos = [];
  }

  ionViewDidEnter(){

    // Inicializamos los arrays
    this.pedidos = [];

    // Obtenemos el nombre del usuario
    this.fireAuth.user.subscribe(data => {
      this.user = data;
      // this.nombre = this.user.displayName;

      // Obtenemos los pedidos que ha hecho el cliente de la base de datos 
      db.collection('pedidos').where('uidCliente', '==', this.user.uid).get().then(snap => {
        snap.forEach(doc => {

          // Creamos el objeto pedido
          let uid = doc.id;
          let hora = doc.data().hora.toDate();
          let concepto = doc.data().concepto;
          let cliente = doc.data().cliente;
          let info = doc.data().info;
          let total = doc.data().total;
          let recogido = doc.data().recogido;
          let conceptoNombres = "";

          // Obtenemos los nombres de los artículos y ofertas del pedido
          for(let i = 0; i < concepto.length; i++){
            db.collection('ofertas').doc(concepto[i]).get().then(doc =>{
              if(typeof(doc.data()) != 'undefined'){
                conceptoNombres += doc.data().nombre + " ";
              }
            });

            db.collection('articulos').doc(concepto[i]).get().then(doc =>{
              if(typeof(doc.data()) != 'undefined'){
                conceptoNombres += doc.data().nombre + " ";  
              }
            }).then(() => {
              // Una vez hayan llegado los datos de la bd creamos el nuevo objeto pedido y lo introducimos en el array
              if(i == concepto.length - 1){
                
                // Nuevo objeto pedido
                let pedido = new Pedido(uid, hora, concepto, cliente, info, total, recogido, conceptoNombres); // Ponemos siempre recogido como false
                
                // Lo introducimos en el array
                this.pedidos.push(pedido);
              }
            });
          }

        });
      })

    })
  }

  // New order
  newOrder(){
    // Dirigimos al cliente a la página order para que pueda hacer su pedido
    this.router.navigate(['order']);
  }

  // Info
  showInfo(concepto: string){
    console.log(concepto);
  }

}
