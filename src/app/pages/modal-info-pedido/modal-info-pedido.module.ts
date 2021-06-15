import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoPedidoPageRoutingModule } from './modal-info-pedido-routing.module';

import { ModalInfoPedidoPage } from './modal-info-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoPedidoPageRoutingModule
  ],
  declarations: [ModalInfoPedidoPage]
})
export class ModalInfoPedidoPageModule {}
