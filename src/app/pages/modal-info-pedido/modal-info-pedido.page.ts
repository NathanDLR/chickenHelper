import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import db from '../../../environments/environment';

@Component({
  selector: 'app-modal-info-pedido',
  templateUrl: './modal-info-pedido.page.html',
  styleUrls: ['./modal-info-pedido.page.scss'],
})
export class ModalInfoPedidoPage implements OnInit {

  // Datos del pedido
  uid: string;
  hora: string;
  cliente: string;
  info: string;
  total: string;
  conceptoNombres: string = "";
  nombreAsador: string;

  constructor(private modal: ModalController) { }

  ngOnInit() {

    // Obtenemos los datos del pedido para poder mostrarlos
    db.collection('pedidos').doc(this.uid).get().then( doc => {
      
      // Datos del pedido
      let concepto = doc.data().concepto;
      this.hora = doc.data().hora.toDate();
      this.cliente = doc.data().cliente;
      this.info = doc.data().info;
      this.total = doc.data().total;

      // Obtenemos los nombres de los artículos y ofertas del pedido
      for(let i = 0; i < concepto.length; i++){
        db.collection('ofertas').doc(concepto[i]).get().then(doc =>{
          if(typeof(doc.data()) != 'undefined'){
            this.conceptoNombres += doc.data().nombre + " ";
          }
        });

        db.collection('articulos').doc(concepto[i]).get().then(doc =>{
          if(typeof(doc.data()) != 'undefined'){
            this.conceptoNombres += doc.data().nombre + " ";  
          }
        });
      }

      db.collection('users').doc(doc.data().uidAsador).get().then(doc => {
        this.nombreAsador = doc.data().name;
      })

    });

  }

  // Dismiss 
  dismiss(){
    this.modal.dismiss();
  }

}
