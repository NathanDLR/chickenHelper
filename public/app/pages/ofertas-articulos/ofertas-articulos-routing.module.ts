import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertasArticulosPage } from './ofertas-articulos.page';

const routes: Routes = [
  {
    path: '',
    component: OfertasArticulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertasArticulosPageRoutingModule {}
