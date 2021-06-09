import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Formulario en código
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private alert: AlertController) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),

      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

  }

  // Login
  async login(email:string, pwd: string){
   try {
    const user = await this.auth.login(email, pwd);
    if(user){
      // Comprobamos si el correo ha sido verificado
      const verified = this.auth.isEmailVerified(user)
      this.redirectUser(verified);
    }
   } 
   catch (error) {
    console.log('Error: ', error)

   } 
  }

  // Login con Google
  async loginGoogle(){
    try{
      const user = await this.auth.loginGoogle()
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

  // Redirigir usuario a la página que queramos según si está verificado
  private redirectUser(verfied: Boolean){
      // Si el usuario está verificado lo redirigimos a la página de ofertas-artículos
      if(verfied){
        this.router.navigate(['tabs/ofertas-articulos']);
      }
      else{
        // De lo contrario lo redirigimos a una página para que verifique su correo
        this.router.navigate(['verify-email'])
      }
  }

  // Alert para pedirle al usuario que verifique su cuenta de correo
  async presentVerificationAlert(){
    const alert = await this.alert.create({
      header: 'Verificación de correo',
      message: 'Tu correo todavía no ha sido registrado/verificado, por favor, registrate, verifica tu correo y vuelve a intentarlo',
      buttons: ['OK']
    });

    await alert.present();
  }


}
