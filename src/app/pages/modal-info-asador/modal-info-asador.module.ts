import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoAsadorPageRoutingModule } from './modal-info-asador-routing.module';

import { ModalInfoAsadorPage } from './modal-info-asador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoAsadorPageRoutingModule
  ],
  declarations: [ModalInfoAsadorPage]
})
export class ModalInfoAsadorPageModule {}
