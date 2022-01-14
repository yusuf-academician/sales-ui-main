import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from 'src/app/model/category';
import { Ingredient } from 'src/app/model/ingredient';
import { APIS } from '../APIs/apis';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ingredientURL = APIS.ingredientURL;
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  createIngredient(ingredient: Ingredient): Observable<any>{
    return this._http.post<Category>(this.ingredientURL, JSON.stringify(ingredient),this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getIngredient(id: any):Observable<any>{
    return this._http.get<any>(this.ingredientURL +id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getIngredientsByAdmin():Observable<any>{
    return this._http.get<any>(this.ingredientURL +"admin").pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getIngredients():Observable<any>{
    return this._http.get<any>(this.ingredientURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteIngredient(id: any):Observable<any>{
    return this._http.delete<any>(this.ingredientURL+id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateIngredient(id:any, ingredient: any):Observable<any>{
    return this._http.patch<any>(this.ingredientURL+id, JSON.stringify(ingredient), this.httpOptions).pipe(
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
