import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalVentaPageRoutingModule } from './modal-venta-routing.module';

import { ModalVentaPage } from './modal-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalVentaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalVentaPage]
})
export class ModalVentaPageModule {}
