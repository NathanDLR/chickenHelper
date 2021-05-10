import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOfertaPage } from './modal-oferta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOfertaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOfertaPageRoutingModule {}
