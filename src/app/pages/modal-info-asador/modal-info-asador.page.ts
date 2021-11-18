import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import db from '../../../environments/environment';

@Component({
  selector: 'app-modal-info-asador',
  templateUrl: './modal-info-asador.page.html',
  styleUrls: ['./modal-info-asador.page.scss'],
})
export class ModalInfoAsadorPage implements OnInit {

  // Id asador que obtenemos de la página order
  uid: string;

  // Datos del asador
  name: string;
  schedule: string;
  address: string;
  addressUrl: string;
  tlf: string;
  
  constructor(private modal: ModalController) { }

  ngOnInit(){

    // Obtenemos los datos del asador para poder mostarlos
    db.collection('users').doc(this.uid).get().then(doc => {

      this.name = doc.data().name;
      this.schedule = doc.data().schedule;
      this.address = doc.data().address;
      this.addressUrl = doc.data().addressUrl;
      this.tlf = doc.data().tlf;

    });

  }

  // Dismiss modal
  dismiss(){
    this.modal.dismiss();
  }

}
