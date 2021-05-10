import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage implements OnInit {

  pwdForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    // Formulario para recuperar la contraseña en código
    this.pwdForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ])
    })

  }

  // Restablecer la contraseña
  async resetPwd(email: string){
    // 
    try{
      await this.auth.resetPWd(email); 
      this.router.navigate(['login']);

    }
    catch(error){
      console.log('Error: ', error);
    }

  }

}
