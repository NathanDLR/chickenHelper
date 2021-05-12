import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  // Navegar al login
  navigateLogin(){
    this.router.navigate(['login']);
  }

  // Navegar al register
  navigateRegister(){
    this.router.navigate(['register']);
  }

}
