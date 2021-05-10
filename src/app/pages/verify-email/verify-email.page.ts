import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  user$: Observable<User> = this.auth.fireAuth.user;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  // Reenviar el correo de verificación
  async sendEmail(){
    try{
      this.auth.sendVerificationEmail();
    }
    catch(error){
      console.log('Error:', error)
    }
    
  }

  ngOnDestroy(){
    this.auth.logout();
  }


}
