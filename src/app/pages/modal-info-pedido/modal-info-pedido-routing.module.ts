import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoPedidoPage } from './modal-info-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoPedidoPageRoutingModule {}
