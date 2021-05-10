import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalArticuloPage } from './modal-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalArticuloPageRoutingModule {}
