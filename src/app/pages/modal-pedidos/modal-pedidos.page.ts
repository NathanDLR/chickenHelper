import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pedidos',
  templateUrl: './modal-pedidos.page.html',
  styleUrls: ['./modal-pedidos.page.scss'],
})
export class ModalPedidosPage implements OnInit {

  pedidoForm: FormGroup;
  title: string;

  constructor(public modalControlller: ModalController) { }

  ngOnInit() {

    // Título para nuevo artículo
    this.title = "Nuevo Artículo";

    // Formulario en código
    this.pedidoForm = new FormGroup({
      hora: new FormControl('', [
        Validators.required
      ]),

      concepto: new FormControl('', [
        Validators.required
      ]),

      cliente: new FormControl('', [
        Validators.required
      ]),

      info: new FormControl('', [
        Validators.required
      ]),
      
    })

  }

  // Dismiss modal
  dismissModal(){
    this.modalControlller.dismiss();
  }

}
