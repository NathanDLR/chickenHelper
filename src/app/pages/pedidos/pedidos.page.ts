import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/classes/pedido';
import db from '../../../environments/environment';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  // Array con los pedidos
  pedidos: Pedido[];

  constructor() { }

  ngOnInit() {

    // TODO: Traer los pedidos de la base de datos y crear objetos pedido
    this.pedidos = [];

    // Obtenemos los datos de la colección de pedidos
    db.collection('pedidos').onSnapshot(snap => {

      // Vaciamos el array para que no se dupliquen los pedidos
      this.pedidos = [];

      snap.forEach(snapHijo => {

        // Obtenemos los datos del pedido
        let uid = snapHijo.id;
        let hora = snapHijo.data().hora.toDate();
        let concepto = snapHijo.data().concepto;
        let cliente = snapHijo.data().cliente;
        let info = snapHijo.data().info;
        let total = snapHijo.data().total;

        // Nuevo objeto pedido
        let pedido = new Pedido(uid, hora, concepto, cliente, info, total);

        // Lo introducimos en el array
        this.pedidos.push(pedido);

        console.log(hora);
      })


    })


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
