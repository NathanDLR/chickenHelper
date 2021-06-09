import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        if (user){
          if(user.tipo == 0) return true;
          else{
            // Redirigimos al inicio
            this.router.navigate(['home']);
            return false;
          }
        }
        else{
          // Redirigimos al inicio
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  }
  
}
