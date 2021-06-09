import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'ofertas-articulos',
        loadChildren: () => import('../ofertas-articulos/ofertas-articulos.module').then(m => m.OfertasArticulosPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then(m => m.PedidosPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'venta',
        loadChildren: () => import('../venta/venta.module').then(m => m.VentaPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'caja',
        loadChildren: () => import('../caja/caja.module').then(m => m.CajaPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/ofertas-articulos',
    pathMatch: 'full'
  },
  {
    path: '/tabs',
    redirectTo: 'tabs/ofertas-articulos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
