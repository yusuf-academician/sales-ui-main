import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Menu } from 'src/app/model/menu';
import { APIS } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuURL = APIS.menuURL;
  constructor(private _http: HttpClient) { }

  createMenu(menu: Menu): Observable<any>{
    console.log(menu)
    return this._http.post<Menu>(this.menuURL, menu).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMenusByUser():Observable<any>{
    return this._http.get<any>(this.menuURL  +"user").pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMenus():Observable<any>{
    return this._http.get<any>(this.menuURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMenuById(id: any):Observable<any>{
    return this._http.get<any>(this.menuURL +id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  updateMenu(id:any, shop: any):Observable<any>{
    return this._http.patch<any>(this.menuURL+id, JSON.stringify(shop)).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  uploadFile(menuId: any, menuObject:any):Observable<any>{
    return this._http.patch<any>(this.menuURL +"upload-file/"+menuId, menuObject)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteMenu(id: any):Observable<any>{
    return this._http.delete<any>(this.menuURL+id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMenuByCategory(categoryId: string):Observable<any>{
    return this._http.get<any>(this.menuURL+ 'category/'+categoryId).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  searchMenusByPriceandPostCode(filter: any):Observable<any>{
    return this._http.patch<any>(this.menuURL +'find', filter).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  searchMenus(name: any):Observable<any>{
    return this._http.get<any>(this.menuURL +'search/'+name).pipe(
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
