import { PortfolioService } from './../../../services/portfolio.service';
import { CoinService } from 'src/app/services/coin.service';
import { Movement } from 'src/app/models/Movement';
import { Asset } from 'src/app/models/Asset';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { take } from 'rxjs';
import { Coin } from 'src/app/models/Coin';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  // data: Portfolio = {
  //   name: "Portfolio numero1",
  //   assets: [
  //     {
  //       name_asset: "Bitcoin",
  //       symbol_asset: "BTC",
  //       movements: [
  //         {
  //           type_movement: "Buy",
  //           date_movement: new Date(),
  //           price_movement: 57653.85,
  //           quantity_movement: 0.003275
  //         },
  //         {
  //           type_movement: "Buy",
  //           date_movement: new Date(),
  //           price_movement: 55872.90,
  //           quantity_movement: 0.003256
  //         }
  //       ]
  //     },
  //     {
  //       name_asset: "Ethereum",
  //       symbol_asset: "ETH",
  //       movements: [
  //         {
  //           type_movement: "Buy",
  //           date_movement: new Date(),
  //           price_movement: 1000,
  //           quantity_movement: 1
  //         },
  //         {
  //           type_movement: "Buy",
  //           date_movement: new Date(),
  //           price_movement: 1050,
  //           quantity_movement: 1
  //         }
  //       ]
  //     },
  //     {
  //       name_asset: "BNB",
  //       symbol_asset: "bnb",
  //       movements: [
  //         {
  //           type_movement: "buy",
  //           date_movement: new Date(),
  //           price_movement: 200,
  //           quantity_movement: 1
  //         }
  //       ]
  //     }

  //   ]
  // };



  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['currencie', 'holdings', 'quantity', 'symbol', 'averageBuyPrice', 'profitLoss', 'delete'];
  private BUY_STRING: string = 'buy';
  private SELL_STRING: string = 'sell';

  coins: Coin[] | undefined = [];

  dataSource = new MatTableDataSource();

  data!: Portfolio ;

  hasPortfolio: Boolean | undefined;

  data_empty: Portfolio = {
    name: this.tokenService.getUser().username + "'s portfolio" ,
    assets: [

    ]
  }

  constructor(
    public modalService: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private coinService: CoinService,
    private portFolioService: PortfolioService,
    private tokenService: TokenStorageService,
  ) {
    if(this.data === undefined) {
      this.data = this.data_empty;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.calcHasPortfolio();
    this.getCoinsData();
    this.getAsyncData();
  }

  openDialog() {
    const dialogRef = this.modalService.open(DialogComponent, {
      data: this.data
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Dialog Result', result)

        if(result !== undefined && result !== ''){
          // console.log('le has dado a confirmar');
          // window.location.reload();
        }

        this.hasPortfolio = true;

        this.dataSource.data = this.getDataTable();
      }
    );
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getDataTable(): Object[]{
    let dataTable: object[] = [];

    this.data.assets?.forEach(asset => {
      let totalBuy = 0;
      let totalSell = 0;
      let totalSpent = 0;
      let totalQuantity = 0;
      let averageBuyPrice = 0;
      let buyQuantity = 0;

      asset.movements?.forEach(value => {
        //calc total spent/bought
        if(value.type.toLowerCase() == this.BUY_STRING){
          totalBuy += value.price * value.quantity;
        }
        else if(value.type.toLowerCase() == this.SELL_STRING){
          totalSell += value.price * value.quantity;
        }

        //calc total quantity of asset
        totalQuantity += value.quantity;

        //calc average price of asset
        if(value.type.toLowerCase() == this.BUY_STRING){
          averageBuyPrice += value.price;
          buyQuantity++;
        }

      })

      totalSpent = totalBuy - totalSell;

      averageBuyPrice = averageBuyPrice/buyQuantity;

      const obj = {
        name: asset.name,
        holdings: totalSpent,
        symbol: asset.symbol,
        quantity: totalQuantity,
        averageBuyPrice: this.calcAverageBuyPrice(asset),
        profitLoss: this.calcProfitLoss(asset, totalQuantity),
        profitLossPercentage: this.calcProfitLossPercentage(asset, totalQuantity),
      }

      dataTable.push(obj);
    })

    return dataTable;
  }

  async getCoinsData() {
    await this.coinService.getCoins().toPromise().then((coinData) => {
      this.coins = coinData;
      }, (err) => {
      console.error(err)
    });
  }


  async getPortfolio() {
    await this.portFolioService.get(this.tokenService.getUser().id).subscribe( (value: any) => {
      this.data = value;

      if(value.assets.length === 0) {
        this.hasPortfolio === false;
      }

      this.getAsyncData();
    }, (err: any) => {
      console.log(err)
    });

  }

  async calcHasPortfolio(){
    await this.portFolioService.hasPortfolio(this.tokenService.getUser().id).subscribe( (value) => {
      this.hasPortfolio = value;

      if(value === true){
        this.getPortfolio();
      }
    }, (err) => {
      console.log(err)
    });

  }

  async getAsyncData() {
    this.dataSource.data = this.getDataTable();
  }

  calcProfitLossPercentage(asset: Asset, quantity: number): number{

    const averagePrice = this.calcAverageBuyPrice(asset);
    const profitLoss = this.calcProfitLoss(asset,quantity);
    let profitLossPercentage = 0;

    if(profitLoss < 0) {
      profitLossPercentage = (100 * profitLoss) / averagePrice
    }
    else{
      profitLossPercentage = (profitLoss/ averagePrice) - 1;

      if(profitLossPercentage < 0) {
        profitLossPercentage *= -1;
      }
    }

    return profitLossPercentage;
  }

  calcProfitLoss(asset: Asset, quantity: number): number{
    let profitLoss = 0;
    const nameAsset = asset.name;
    const precioMedio = this.calcAverageBuyPrice(asset);

    const indexCurrencie = this.coins!.findIndex(value => value.name.toLowerCase() == nameAsset.toLowerCase());

    profitLoss = (this.coins![indexCurrencie].current_price - precioMedio) * quantity;

    return profitLoss;
  }

  calcAverageBuyPrice(asset: Asset): number{
    let buyQuantity = 0;
    let averageBuyPrice = 0;

    asset.movements?.forEach(value => {
      if(value.type.toLowerCase() == this.BUY_STRING ){
        averageBuyPrice += value.price;
        buyQuantity++;
      }
    });

    averageBuyPrice = averageBuyPrice/buyQuantity;

    return averageBuyPrice;
  }

  delete(assetDeleted: any): void{
    this.data.assets = this.data.assets?.filter(asset => asset.name !== assetDeleted.name);

    this.portFolioService.update(this.tokenService.getUser().id, this.data).subscribe( (value: any) => {
      console.log(value)

    }, (err: any) => {
      console.log(err)
    });

    this.dataSource.data = this.getDataTable();
  }

}
