import { CoinService } from './../../../services/coin.service';
import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/Coin';

@Component({
  selector: 'app-table-cryptocurrencies',
  templateUrl: './table-cryptocurrencies.component.html',
  styleUrls: ['./table-cryptocurrencies.component.css']
})
export class TableCryptocurrenciesComponent implements OnInit {

  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Price', 'Price Change', '24h Volume'];
  searchText: string = '';

  constructor(
    private coinService: CoinService
  ) { }

  ngOnInit(): void {
    this.coinService.getCoins().subscribe(
      res => {
        this.coins = res;
        this.filteredCoins = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    )
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter((coin) =>
      coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
