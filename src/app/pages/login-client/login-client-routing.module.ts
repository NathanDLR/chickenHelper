import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginClientPage } from './login-client.page';

const routes: Routes = [
  {
    path: '',
    component: LoginClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginClientPageRoutingModule {}
