import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private auth: AuthService) {}

  // Navegar al login
  navigateLogin(){
    this.router.navigate(['login']);
  }

  // Navegar al register
  navigateRegister(){
    this.router.navigate(['register']);
  }

  // Navegar al login para clientes
  navigateLoginClient(){
    this.router.navigate(['login-client']);
  }

  // Navegar al register para clientes
  navigateRegisterClient(){
    this.router.navigate(['register-client']);
  }

  // Log out 
  logOut(){
    this.auth.logout();
  }

} 
