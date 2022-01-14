import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGraudService implements CanActivate {

  constructor(public authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if(this.authService.isUserLoggedIn()){
      return true
    }else{
      this.router.navigate(['login'])
      return false
    }
  }
}
