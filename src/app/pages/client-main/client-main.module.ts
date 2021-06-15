import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientMainPageRoutingModule } from './client-main-routing.module';

import { ClientMainPage } from './client-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientMainPageRoutingModule
  ],
  declarations: [ClientMainPage]
})
export class ClientMainPageModule {}
