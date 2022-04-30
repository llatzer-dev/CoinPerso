import { CoinService } from './../../../services/coin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Coin } from 'src/app/models/Coin';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-table-cryptocurrencies',
  templateUrl: './table-cryptocurrencies.component.html',
  styleUrls: ['./table-cryptocurrencies.component.css']
})
export class TableCryptocurrenciesComponent implements OnInit {

  searchText: string = '';
  realTimePrices: any = {};
  coins: Coin[] = [];
  tableColumns: string[] = ['image', 'rank', 'name', 'price', 'capacity', 'variation'];

  datasource = new MatTableDataSource<Coin>([]);

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private coincapService: CoinService
  ) {}

  ngOnInit() {
    this.coincapService.getCoins().subscribe((coinData) => {
        this.coins = coinData;
        this.datasource.data = coinData;
        console.log(coinData)
      },
      (err) => console.error(err),
      () => this.getRealTimePrices()
    );
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  getRealTimePrices() {
    webSocket(`wss://ws.coincap.io/prices?assets=${this.getCoinsNames()}`)
      .subscribe((prices: any) => {
        this.realTimePrices = {...this.realTimePrices, ...prices};

        setTimeout(() => {
          this.datasource.data.map(coin => {
            coin.current_price = prices[coin.id] ? prices[coin.id] : coin.current_price;
          });
        }, 400);

      }, (error) => console.error(error));
  }

  getCoinsNames() {
    return this.datasource.data.map(coin => coin.id).join();
  }

  testChanges(event?: any) {
    console.log('hey', event.target.textContent);
  }

  searchCoin() {
      this.datasource.data = this.coins.filter((coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase())
        || coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
      );
  }

}
