import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    // Formulario de registro en código
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),

      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])

    })

  }

  // Validación del formulario
  async validate(email: string, pwd: string){

  }

  // Registrarse
  async register(email: string, pwd: string){
    try{
      const user = await this.auth.register(email, pwd);
      // Si nos devuelve usuario comprobamos que se ha verificado el email
      if(user){
        
        // Comprobamos email verificado
        const verified = this.auth.isEmailVerified(user);
        this.redirectUser(verified);

      }
    }
    catch(error){
      console.log('Error: ', error);
    }
  }

  // Redirigir usuario a la página que queramos según si está verificado
  private redirectUser(verfied: Boolean){
    // Si el usuario está verificado lo redirigimos a la página principal 
    if(verfied){
      this.router.navigate(['ofertas-articulos']);
    }
    else{
      // De lo contrario lo redirigimos a una página para que verifique su correo
      this.router.navigate(['verify-email'])
    }
  }

}
