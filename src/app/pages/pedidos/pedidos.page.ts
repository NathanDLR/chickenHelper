import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Pedido } from 'src/app/classes/pedido';
import db from '../../../environments/environment';
import { ModalPedidosPage } from '../modal-pedidos/modal-pedidos.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  // Array con los pedidos
  pedidos: Pedido[];

  constructor(public modalController: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.pedidos = [];

    // Obtenemos los datos de la colección de pedidos TODO: Mostrar solo los pedidos de el asador actual
    db.collection('pedidos').orderBy('hora').onSnapshot(snap => {

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

        let conceptoNombres = new Array();

        for(let i = 0; i < concepto.length; i++){
          db.collection('ofertas').doc(concepto[i]).get().then(doc =>{
            if(typeof(doc.data()) != 'undefined'){
              conceptoNombres.push(doc.data().nombre);
            }
          });

          db.collection('articulos').doc(concepto[i]).get().then(doc =>{
            if(typeof(doc.data()) != 'undefined'){
              conceptoNombres.push(doc.data().nombre);
            }
          });
        }

        // Nuevo objeto pedido
        let pedido = new Pedido(uid, hora, concepto, cliente, info, total);

        // Lo introducimos en el array
        this.pedidos.push(pedido);
      });
    });

    

  }

  //TODO: Marcar pedido como recogido
  check(){

  }

  //TODO: Editar pedido
  edit(){

  }

  // Borrar pedido
  delete(uid: string){
    db.collection('pedidos').doc(uid).delete();
  }

  // Presentar modal pedido
  async presentModalPedido(){
    const modal = await this.modalController.create({
      component: ModalPedidosPage
    });

    return await modal.present();
  }

}
