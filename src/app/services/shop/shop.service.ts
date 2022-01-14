import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Shop } from 'src/app/model/shop';
import { APIS } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  shopURL = APIS.shopURL;
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"}),
  }

  createShop(shop: any): Observable<any>{
    return this._http.post<Shop>(this.shopURL, JSON.stringify(shop),this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  uploadFiles(shopId:any, shopObject: any):Observable<any>{
    return this._http.patch<any>(this.shopURL +"file-upload/"+shopId, shopObject)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getShops():Observable<any>{
    return this._http.get<any>(this.shopURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getShopById(id: any):Observable<any>{
    return this._http.get<any>(this.shopURL +id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getShopsByUser():Observable<any>{
    return this._http.get<any>(this.shopURL +"user").pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateShop(id:any, shop: any):Observable<any>{
    return this._http.patch<any>(this.shopURL+id, JSON.stringify(shop), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  approveShop(id:any, approval: any):Observable<any>{
    console.log(approval);
    return this._http.patch<any>(this.shopURL +"approve/"+id, approval).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteShop(id: any):Observable<any>{
    return this._http.delete<any>(this.shopURL+id).pipe(
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
