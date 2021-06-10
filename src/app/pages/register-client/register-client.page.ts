import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {

  registerClientForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // Formulario de registro en código
    this.registerClientForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),

      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])

    })
  }

  // Registrarse
  async register(email: string, pwd: string){
    try{
      const user = await this.auth.registerClient(email, pwd);
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
      this.router.navigate(['order']);
    }
    else{
      // De lo contrario lo redirigimos a una página para que verifique su correo
      this.router.navigate(['verify-email'])
    }
  }

}
