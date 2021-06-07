import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import db from '../../../environments/environment';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.page.html',
  styleUrls: ['./caja.page.scss'],
})
export class CajaPage implements OnInit {

  // Total de venta
  venta: number = 0;

  // Usuario y fecha atuales
  user: firebase.default.User;
  date = new Date().toLocaleDateString();

  constructor(private fireAuth: AngularFireAuth){}

  ngOnInit() {
  }

  // Calcular la caja
  calcTotal(){

    // Tenemos que sumar el precio de todos los pedidos y de la venta extra
    // Empezamos por el la venta extra que es más rápido
    this.fireAuth.user.subscribe( data => {
      
      this.user = data;
      let uid = this.user.uid;

      db.collection('venta').where('uidAsador', '==', uid).orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( snap => {
        snap.forEach(doc => {
          this.venta = doc.data().total;
        })
      })

    });



  }


}
