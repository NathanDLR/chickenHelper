import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPedidosPage } from './modal-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPedidosPageRoutingModule {}
