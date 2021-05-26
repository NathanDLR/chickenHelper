import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPedidosPageRoutingModule } from './modal-pedidos-routing.module';

import { ModalPedidosPage } from './modal-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPedidosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalPedidosPage]
})
export class ModalPedidosPageModule {}
