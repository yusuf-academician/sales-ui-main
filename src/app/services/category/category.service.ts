import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from 'src/app/model/category';
import { APIS } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryURL = APIS.categoryURL
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  createCategory(category: Category): Observable<any>{
    return this._http.post<Category>(this.categoryURL, JSON.stringify(category),this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCategory(id: any):Observable<any>{
    return this._http.get<any>(this.categoryURL +id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCategoriesByAdmin():Observable<any>{
    return this._http.get<any>(this.categoryURL + "admin").pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCategories():Observable<any>{
    return this._http.get<any>(this.categoryURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteCategory(id: any):Observable<any>{
    return this._http.delete<any>(this.categoryURL+id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateCategory(id:any, category: any):Observable<any>{
    return this._http.patch<any>(this.categoryURL+id, JSON.stringify(category), this.httpOptions).pipe(
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

