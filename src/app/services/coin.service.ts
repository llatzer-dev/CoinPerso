import { HttpClient } from '@angular/common/http';
import { Coin } from './../models/Coin';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  constructor(private http: HttpClient) { }

  getCoins() {
    return this.http.get<Coin[]>(this.url).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
      console.log(err);
      }
    );
  }
}
