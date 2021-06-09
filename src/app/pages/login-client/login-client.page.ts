import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.page.html',
  styleUrls: ['./login-client.page.scss'],
})
export class LoginClientPage implements OnInit {

  // Formulario en código
  loginClientForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private alert: AlertController){}

  ngOnInit() {

    this.loginClientForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),

      pwd: new FormControl('', [
        Validators.required, 
        Validators.minLength(6)
      ])
    });

  }

  // Login cliente
  async login(email: string, pwd: string){
    try{
      const user = await this.auth.login(email, pwd);
      if(user){
        // Comprobamos si se ha verificado el correo
        const verified = this.auth.isEmailVerified(user);
        this.redirectUser(verified);
      }
    }
    catch(error){
      console.log('Error:', error);
    }
  }

  // Login con Google
  async loginGoogle(){
    try{
      const user = await this.auth.loginGoogleClient()
      if (user){
        // Comprobamos si el correo ha sido verificado
        const verified = this.auth.isEmailVerified(user)
        this.redirectUser(verified);
      }
      else{
        // Si no ha sido verificado le pedimos al usuario que lo verifique
      }
    }
    catch(error){
      console.log('Error', error);
    }
  }


  // Redirigir al usuario a la página que queramos si está verificado
  private redirectUser(verified: Boolean){
    // Si el usuario está verificado lo dirigimos a la página order
    if(verified){
      this.router.navigate(['order']);
    }
    else{
      // De lo contrario lo redirigimos a la página que verifica el correo
      this.router.navigate(['verify-email']);
    }
  }

}
