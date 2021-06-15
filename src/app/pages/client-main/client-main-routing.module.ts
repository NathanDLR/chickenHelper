import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientMainPage } from './client-main.page';

const routes: Routes = [
  {
    path: '',
    component: ClientMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientMainPageRoutingModule {}
