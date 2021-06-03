import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalVentaPage } from './modal-venta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalVentaPageRoutingModule {}
