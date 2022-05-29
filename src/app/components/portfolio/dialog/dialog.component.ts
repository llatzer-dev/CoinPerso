import { Portfolio } from 'src/app/models/Portfolio';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coin } from 'src/app/models/Coin';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  coins: Coin[] = [];

  portfolio: Portfolio = this.data;

  constructor(
    private coinService: CoinService,
    public modal: NgbModal,
    // public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.modal.open;

    this.coinService.getCoins().subscribe((coinData) => {
      this.coins = coinData;
      console.log(coinData)
      }, (err) => {
        console.error(err)
    });
  }

}
