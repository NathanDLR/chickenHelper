import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/classes/pedido';
import db from '../../../environments/environment';
import { ModalPedidosPage } from '../modal-pedidos/modal-pedidos.page';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  // Usuario y fecha actual 
  user: firebase.default.User;
  date = new Date().toLocaleDateString();

  // Array con los pedidos
  pedidos: Pedido[];

  constructor(public modalController: ModalController, private toastCtrl: ToastController, private fireAuth: AngularFireAuth, private alertCtrl: AlertController){
    
  }

  ngOnInit() {
    this.pedidos = [];

    this.fireAuth.user.subscribe(data => {
      
    // Datos del usuario actual
      this.user = data;
      let uid = this.user.uid;
      
      // Obtenemos los datos de la colección de pedidos
      db.collection('pedidos').where("uidAsador", "==", uid).orderBy('fecha').orderBy('hora').startAt(this.date).endAt(this.date+'\uf8ff').onSnapshot(snap => {
        
      // Vaciamos el array para que no se dupliquen los pedidos
      this.pedidos = [];

      snap.forEach(snapHijo => {

        // Obtenemos los datos del pedido
        let uid = snapHijo.id;
        let hora = snapHijo.data().hora.toDate();
        let concepto = snapHijo.data().concepto;
        let cliente = snapHijo.data().cliente;
        let info = snapHijo.data().info;
        let total = snapHijo.data().total;
        let recogido = snapHijo.data().recogido;
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
    }); 

    });
  }

  // Marcar pedido como recogido
  check(uid: string){
    db.collection('pedidos').doc(uid).update({
      recogido: true
    })
  }

  uncheck(uid: string){
    db.collection('pedidos').doc(uid).update({
      recogido: false
    })
  }

  // Editar pedido
  async edit(uid: string, hora: Date){
    // Abrimos el modal pedidos pero pasando el uid
    const modal = await this.modalController.create({
      component: ModalPedidosPage,
      componentProps: {
        'uid': uid,
        'hora': hora // De momento pasamos la hora así porque da problemas al traerla de la bd
      }
    });

    return await modal.present();
  }

  // Borrar pedido
  async delete(uid: string){

    // Preguntamos al usuario si está seguro de borrar el pedido
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: 'Vas a borrar este pedido y no lo podrás recuperar',
      buttons: [
        {
          text: 'Borrar',
          handler: () => {
            // Borramos el pedido e informamos al usuario
            db.collection('pedidos').doc(uid).delete();
            this.presentToast("Pedido borrado correctamente");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();
  }

  // Presentar modal pedido
  async presentModalPedido(){
    const modal = await this.modalController.create({
      component: ModalPedidosPage
    });

    return await modal.present();
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

  // Cambiar el color de la fila del pedido
  setColor(recogido: boolean){
    if(recogido) return 'darkgreen';
  }

  // Card Payment: Gets order price and adds it to card total
  cardPayment(){
    console.log("Registering Payment...")
  }

}
