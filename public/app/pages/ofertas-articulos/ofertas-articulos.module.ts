import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertasArticulosPageRoutingModule } from './ofertas-articulos-routing.module';

import { OfertasArticulosPage } from './ofertas-articulos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertasArticulosPageRoutingModule
  ],
  declarations: [OfertasArticulosPage]
})
export class OfertasArticulosPageModule {}
