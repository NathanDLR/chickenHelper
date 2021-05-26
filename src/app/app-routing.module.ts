import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'ofertas-articulos',
    loadChildren: () => import('./pages/ofertas-articulos/ofertas-articulos.module').then( m => m.OfertasArticulosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-pwd',
    loadChildren: () => import('./pages/forgot-pwd/forgot-pwd.module').then( m => m.ForgotPwdPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'caja',
    loadChildren: () => import('./pages/caja/caja.module').then( m => m.CajaPageModule)
  },
  {
    path: 'modal-articulo',
    loadChildren: () => import('./pages/modal-articulo/modal-articulo.module').then( m => m.ModalArticuloPageModule)
  },
  {
    path: 'modal-oferta',
    loadChildren: () => import('./pages/modal-oferta/modal-oferta.module').then( m => m.ModalOfertaPageModule)
  },
  {
    path: 'modal-pedidos',
    loadChildren: () => import('./pages/modal-pedidos/modal-pedidos.module').then( m => m.ModalPedidosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
