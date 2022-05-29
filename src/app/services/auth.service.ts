import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const AUTH_API = 'http://localhost:27017/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint = environment.apiURL + '/auth/';

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.endPoint + 'signin', {
      username, password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any>{
    return this.http.post(this.endPoint + 'signup', {
      username, email, password
    }, httpOptions);
  }

}
