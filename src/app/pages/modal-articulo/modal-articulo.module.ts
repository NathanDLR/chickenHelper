import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalArticuloPageRoutingModule } from './modal-articulo-routing.module';

import { ModalArticuloPage } from './modal-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalArticuloPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalArticuloPage]
})
export class ModalArticuloPageModule {}
