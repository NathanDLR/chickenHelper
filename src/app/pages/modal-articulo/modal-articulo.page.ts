import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.page.html',
  styleUrls: ['./modal-articulo.page.scss'],
})
export class ModalArticuloPage implements OnInit {

  articuloForm: FormGroup

  constructor(public alertController: AlertController, public modalController: ModalController) { }

  ngOnInit() {
    // Formulario en código
    this.articuloForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),

      ingredients: new FormControl('', [
        Validators.required
      ]),

      alergies: new FormControl('',[
        Validators.required
      ]),

      price: new FormControl('', [
        Validators.required
      ])

    })
  }

  // Validación del formulario
  async validate(name, desc, alergies, price){

  }

  dismissModal(){
    this.modalController.dismiss();
  }

}
