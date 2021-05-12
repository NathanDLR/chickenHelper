import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOfertaPageRoutingModule } from './modal-oferta-routing.module';

import { ModalOfertaPage } from './modal-oferta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOfertaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalOfertaPage]
})
export class ModalOfertaPageModule {}
