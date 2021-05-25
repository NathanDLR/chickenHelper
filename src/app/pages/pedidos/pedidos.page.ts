import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  // Array con los pedidos
  pedidos: any[];

  constructor() { }

  ngOnInit() {

    // TODO: Traer los pedidos de la base de datos y crear objetos pedido
    this.pedidos = [
      {
        hora: '12.45',
        concepto: 'Medio pollo con patatas',
        cliente: 'Pepito Pérez',
        info: 'Poco hecho',
        total: '6€'
      },

      {
        hora: '13.45',
        concepto: 'Pollo con patatas, cuarto de croquetas',
        cliente: 'Antonio Rodríguez',
        info: 'Las patatas en el mismo envase',
        total: '12€'
      },

      {
        hora: '14.45',
        concepto: 'Tortilla de pimiento',
        cliente: 'Juanito Mi Compare',
        info: 'Con mayonesa',
        total: '4€'
      }
    ]

  }

  // Marcar pedido como recogido
  check(){

  }

  // Editar pedido
  edit(){

  }

  // Borrar pedido
  delete(){

  }

}
