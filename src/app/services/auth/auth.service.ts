import { Injectable } from '@angular/core';
import { APIS } from '../APIs/apis';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from 'src/app/model/userToken';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = APIS.authURL;
  private isAuthenticated$ = new BehaviorSubject(false);
  authState = this.isAuthenticated$.asObservable();
  setAuth(data: boolean) {
    this.isAuthenticated$.next(data);
  }

  public token!: Observable<UserToken>
  constructor(private _http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  login(email: string, password: string){
    return this._http.post<UserToken>(this.authURL, {email, password})
    .pipe(
      map((token: any) => {
        localStorage.setItem('x-auth-token', token.data);
        this.isUserLoggedIn()
        return token;
      })
    )
  }

  recover(email:any){
    return this._http.post<any>(this.authURL+ "recover", {email})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  logout(){
    localStorage.removeItem('x-auth-token');
    this.isUserLoggedIn()
  }

  public get tokenValue(): any{
    return localStorage.getItem('x-auth-token');
  }

  verify(phoneNumber: string, OTPCode: string){
    return this._http.patch<UserToken>(this.authURL+"verify",{phoneNumber, OTPCode})
    .pipe(
      map((token: any) => {
        localStorage.setItem('x-auth-token', token.data)

        return token;
      })
    )
  }

  changePassword(passwordObject: any):Observable<any>{
    return this._http.patch<any>(this.authURL+"change-password",JSON.stringify(passwordObject), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  resetPassword(passwordReset: any):Observable<any>{
    return this._http.post<any>(this.authURL + "reset-password", JSON.stringify(passwordReset), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  isUserLoggedIn(){
    let user = this.tokenValue;
    this.setAuth(user ? true: false)
    if(user == null || "") return false
    return true
  }

  handleError(error: any){
    console.log({error})
    let errorMessage="";
    errorMessage = error.error.msg
    return throwError(errorMessage);
  };
}

