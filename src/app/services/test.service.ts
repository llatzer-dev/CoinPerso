import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const API_URL = 'http://localhost:27017/api/test/';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private endPoint = environment.apiURL + '/test/';

  constructor(
    private http: HttpClient
  ) { }

  getPublicContent(): Observable<any> {
    return this.http.get(
      this.endPoint + 'all',
      {responseType: 'text'}
    );
  }

  getUserBoard(): Observable<any> {
    return this.http.get(
      this.endPoint + 'user',
      { responseType: 'text' }
    );
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(
      this.endPoint + 'mod',
      { responseType: 'text' }
    );
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(
      this.endPoint + 'admin', { responseType: 'text' }
    );
  }

}
