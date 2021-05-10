import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-oferta',
  templateUrl: './modal-oferta.page.html',
  styleUrls: ['./modal-oferta.page.scss'],
})
export class ModalOfertaPage implements OnInit {

  ofertaForm: FormGroup

  constructor(public alertController: AlertController, public modalController: ModalController) { }

  ngOnInit() {
    // Formulario en código
    this.ofertaForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),

      articles: new FormControl('', [
        Validators.required
      ]),

      price: new FormControl('', [
        Validators.required
      ])

  
    })
  }

  // Validación del formulario
  async validate(name, articles, price){

  }

  // Dismiss modal
  dismissModal(){
    this.modalController.dismiss();
  }

}
