import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.page.html',
  styleUrls: ['./order-confirm.page.scss'],
})
export class OrderConfirmPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // My Orders
  myOrders(){
    // Dirigimos al cliente a la página en la que podrá ver sus pedidos
    this.router.navigate(['client-main'])
  }

}
