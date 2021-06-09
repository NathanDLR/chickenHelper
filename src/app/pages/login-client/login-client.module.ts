import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginClientPageRoutingModule } from './login-client-routing.module';

import { LoginClientPage } from './login-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginClientPageRoutingModule
  ],
  declarations: [LoginClientPage]
})
export class LoginClientPageModule {}
