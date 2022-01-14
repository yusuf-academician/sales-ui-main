import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Order, OrderConfig } from 'src/app/model/order';
import { APIS } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderURL = APIS.orderURL;
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  createOrder(order: OrderConfig): Observable<any> {
    return this._http.post<OrderConfig>(this.orderURL, JSON.stringify(order), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getAllOrders():Observable<any>{
    return this._http.get<any>(this.orderURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getOrderById(id: any): Observable<any>{
    return this._http.get<any>(this.orderURL +id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getOrdersByShop(shopId: any): Observable<any>{
    return this._http.get<any>(this.orderURL +'shop/'+shopId).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getOrdersByUser():Observable<any>{
    return this._http.get<any>(this.orderURL +'user').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  approveOrder(orderId:any, body:any):Observable<any>{
    return this._http.patch<any>(this.orderURL +'approve/'+orderId, body).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  cancelOrder(orderId:any, body:any):Observable<any>{
    return this._http.patch<any>(this.orderURL +'cancel/'+orderId, body).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getOrdersByUserfind():Observable<any>{
    return this._http.get<any>(this.orderURL +'find').pipe(
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
