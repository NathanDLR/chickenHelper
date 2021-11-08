import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonInput, ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/classes/pedido';
import { AuthService } from 'src/app/services/auth.service';
import db from '../../../environments/environment';
import { ModalInfoPedidoPage } from '../modal-info-pedido/modal-info-pedido.page';

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

  constructor(private fireAuth: AngularFireAuth, private router: Router, private modal: ModalController, private auth: AuthService){}

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

      // Obtenemos los pedidos que ha hecho el cliente de la base de datos 
      db.collection('pedidos').where('uidCliente', '==', this.user.uid).orderBy('hora', 'desc').limit(3).get().then(snap => {
        snap.forEach(doc => {

          // Creamos el objeto pedido
          let uid = doc.id;
          let hora = doc.data().hora.toDate();
          let concepto = doc.data().concepto;
          let cliente = doc.data().cliente;
          let info = doc.data().info;
          let total = doc.data().total;
          let recogido = doc.data().recogido;
          let cardPayed = doc.data().cardPayed;
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
                let pedido = new Pedido(uid, hora, concepto, cliente, info, total, recogido, cardPayed, conceptoNombres); // Ponemos siempre recogido como false
                
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
  async showInfo(uid: string){
    const modal = await this.modal.create({
      component: ModalInfoPedidoPage,
      componentProps: {
        'uid': uid
      }
    });

    return await modal.present();
  }

  // Log out
  logout(){
    this.auth.logout();
  }

}
