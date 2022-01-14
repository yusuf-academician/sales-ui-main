import { Injectable } from '@angular/core';
import { APIS } from '../APIs/apis';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = APIS.userURL
  generalURL = APIS.generalURL
  constructor(private _http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  //create User
  createUser(user: User): Observable<User>{
    return this._http.post<User>(this.userUrl,JSON.stringify(user),this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  updateUser(user: any):Observable<any>{
    return this._http.patch<any>(this.userUrl,JSON.stringify(user), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCurrentUser():Observable<any>{
    return this._http.get<any>(this.userUrl +"me").pipe(
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
