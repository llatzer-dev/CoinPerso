import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:27017/api/user';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${API_URL}/all`, { responseType: 'text' });
  }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(
  //     API_URL + 'admin', { responseType: 'text' }
  //   );
  // }

  deleteById(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, httpOptions);
  }

}
