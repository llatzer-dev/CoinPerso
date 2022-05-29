import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const API_URL = 'http://localhost:27017/api/user';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint = environment.apiURL + '/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.endPoint}/all`, { responseType: 'text' });
  }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(
  //     API_URL + 'admin', { responseType: 'text' }
  //   );
  // }

  deleteById(id: any): Observable<any> {
    return this.http.delete(`${this.endPoint}/${id}`, httpOptions);
  }

}
