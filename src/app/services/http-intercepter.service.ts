import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService {

  constructor(private authService: AuthService) { }

  intercept(request:HttpRequest<any>, next:HttpHandler ){
    const tokenObj = this.authService.tokenValue;
    const isLoggIn = tokenObj;
    const isAPIURL = request.url.startsWith('http://localhost:3000');
    if(isLoggIn && isAPIURL){
      request = request.clone({headers: request.headers.set('x-auth-token', tokenObj)})
      request = request.clone({headers: request.headers.set('Accept', 'application/json')})
    }
    return next.handle(request)
  }
}
