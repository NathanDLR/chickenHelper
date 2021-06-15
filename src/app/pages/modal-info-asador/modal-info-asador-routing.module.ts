import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoAsadorPage } from './modal-info-asador.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoAsadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoAsadorPageRoutingModule {}
