import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cart } from 'src/app/model/cart';
import { APIS } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartURL = APIS.cartURL
  private carts$ = new BehaviorSubject(0)
  cartState = this.carts$.asObservable()
  setCarts(data: number){
    this.carts$.next(data);
  }

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  AddCart(cart: any):Observable<any>{
    return this._http.post<any>(this.cartURL, cart).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCartByUser():Observable<any>{
    return this._http.get<any>(this.cartURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCartById(id: any){
    return this._http.get<any>(this.cartURL + id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateCart(id: any, cart: any){
    return this._http.patch<any>(this.cartURL + id, cart).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  removeCart(id: any){
    return this._http.delete<any>(this.cartURL + id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: any){
    console.log({error})
    let errorMessage="";
    errorMessage = error.error.msg
    return throwError(errorMessage);
  };
}
