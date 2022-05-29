import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const API_URL = 'http://localhost:27017/api/portfolio';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private endPoint = environment.apiURL + '/portfolio';

  constructor(private http: HttpClient) { }

  hasPortfolio(id: any): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.endPoint}/userId/${id}`, httpOptions);
  }

  post(portfolio: any): Observable<any>{
    return this.http.post(`${this.endPoint}`, portfolio, httpOptions);
  }

  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/${id}`, httpOptions);
  }

  // delete(id: any, asset: any): Observable<any> {
  //   return this.http.delete(`${AUTH_API}/${id}`, asset);
  // }

  update(id: any, portfolio: any): Observable<any> {
    return this.http.put(`${this.endPoint}/${id}`, portfolio);
  }

  // create(data: any): Observable<any> {
  //   return this.http.post(this.baseUrl, data);
  // }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`, data);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }

  // findByTitle(title: any): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}?title=${title}`);
  // }
}
