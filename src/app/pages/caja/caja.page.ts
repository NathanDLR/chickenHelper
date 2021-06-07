import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import db from '../../../environments/environment';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.page.html',
  styleUrls: ['./caja.page.scss'],
})
export class CajaPage implements OnInit {

  // Total de venta
  venta: number = 0;

  // Boolean corregir para mostrar el ion-item que permite corregir la venta
  corregir: Boolean = false;

  // Usuario y fecha atuales
  user: firebase.default.User;
  date = new Date().toLocaleDateString();

  constructor(private fireAuth: AngularFireAuth, private toastCtrl: ToastController){}

  ngOnInit(){

    this.fireAuth.user.subscribe(data =>{

      this.user = data;
      let uid = this.user.uid;

      // Comprobamos si existe ya la caja del día para mostrar el total, que se pone a 0 cuando se refresca la página
      db.collection('caja').where('uidAsador', '==', uid).where('fecha', '==', this.date).get().then(snap => {
        if(snap.size > 0){
          snap.forEach(doc => {
            this.venta = doc.data().total;
          })
        }
    });
    })

  }

  // Calcular la caja
  calcTotal(){

    // Tenemos que sumar el precio de todos los pedidos y de la venta extra
    this.fireAuth.user.subscribe( data => {
      
      this.user = data;
      let uid = this.user.uid;
      let venta = 0;

      // Empezamos por la venta extra
      db.collection('venta').where('uidAsador', '==', uid).orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( snap => {
        snap.forEach(doc => {
          venta = doc.data().total;
        })
      }).then( () => {
        // Sumamos el precio de cada pedido
        db.collection('pedidos').where("uidAsador", "==", uid).orderBy('fecha').orderBy('hora').startAt(this.date).endAt(this.date+'\uf8ff').get().then(snap => {
          snap.forEach(doc =>{
          venta += doc.data().total;
        });
      }).then(() => {
        // Creamos el nuevo documento para guardar la caja de hoy, pero comprobamos que no se haya guardado ya
        db.collection('caja').where('uidAsador', '==', uid).where('fecha', '==', this.date).get().then(snap => {
          if(snap.size == 0){

            this.venta = venta;

            db.collection('caja').add({
              uidAsador: uid,
              fecha: this.date,
              total: this.venta
            })
          }
        });
      });
      });

    });

  }

  // Actualizar el total, si se han metido pedidos nuevos o marcado venta nueva
  update(){
    // Tenemos que sumar el precio de todos los pedidos y de la venta extra
    this.fireAuth.user.subscribe( data => {
      
      this.user = data;
      let uid = this.user.uid;
      let venta = 0;

      // Empezamos por la venta extra
      db.collection('venta').where('uidAsador', '==', uid).orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( snap => {
        snap.forEach(doc => {
          venta = doc.data().total;
        })
      }).then( () => {
        // Sumamos el precio de cada pedido
        db.collection('pedidos').where("uidAsador", "==", uid).orderBy('fecha').orderBy('hora').startAt(this.date).endAt(this.date+'\uf8ff').get().then(snap => {
          snap.forEach(doc =>{
          venta += doc.data().total;
        });
      }).then(() => {
        // Creamos el nuevo documento para guardar la caja de hoy, pero comprobamos que no se haya guardado ya
        db.collection('caja').where('uidAsador', '==', uid).where('fecha', '==', this.date).get().then(snap => {
          if(snap.size == 0){
            this.presentToast("Primero debes hacer la caja");
          }
          else{

            this.venta = venta;

            let id = "";

            snap.forEach(doc => {
              id = doc.id;
            })

            // Actualizamos la caja
            db.collection('caja').doc(id).update({
              total: this.venta
            });

            // Mensaje para el usuario
            this.presentToast('Se ha actualizado el total');

          }
        });
      });
      });

    });
  }

  // Corregir total
  correct(){
    this.corregir = true;
  }

  // Actualizar el total
  updateTotal(total: string){
    

    // Comprobamos que se haya introducido un número
    let ok = this.validate(total);

    if(ok){

      this.fireAuth.user.subscribe(data => {
        this.user = data;
        let uid = this.user.uid;

        // Introducimos el nuevo total en la bd
        db.collection('caja').where('uidAsador', '==', uid).where('fecha', '==', this.date).get().then(snap => {
          if(snap.size == 0){
            this.presentToast("Primero tienes que hacer la caja");
          }
          else{
            snap.forEach(doc => {
              let id = doc.id;

              db.collection('caja').doc(id).update({
                total: total
              })

              // Mensaje para el usuario
              this.presentToast("Se ha modificado la caja")

              this.venta = parseFloat(total);

              // Ocultamos el item
              this.corregir = false;

            });
          }
        });

        


      });

      
    }

  }

  // Validar el total
  validate(total: string): Boolean{

    let ok = true

    if(total == ""){
      ok = false;
      this.presentToast("Debes rellenar el campo");
    }

    if(isNaN(parseInt(total)) && ok == true){
      ok = false;
      this.presentToast("El total debe ser un número");
    }

    return ok;
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
  };

}
