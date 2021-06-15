import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(){

    // Obtenemos los datos del asador para poder mostarlos
    db.collection('users').doc(this.uid).get().then(doc => {

      this.name = doc.data().name;


    });

  }

}
