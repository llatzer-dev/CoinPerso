import { PortfolioService } from './../../../services/portfolio.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Asset } from 'src/app/models/Asset';
import { Coin } from 'src/app/models/Coin';
import { Movement } from 'src/app/models/Movement';
import { Portfolio } from 'src/app/models/Portfolio';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-movement',
  templateUrl: './add-movement.component.html',
  styleUrls: ['./add-movement.component.css']
})
export class AddMovementComponent implements OnInit {

  date = new FormControl(new Date());

  form!: FormGroup;

  @Input()
  portfolio!: Portfolio;
  @Input()
  typeMovement: string = "";
  @Input()
  coins: Coin[] = [];

  constructor(
    private _fb: FormBuilder,
    private portfolioService: PortfolioService,
    private tokenService: TokenStorageService,
  ) { }

  get nameAsset() { return this.form.get('nameAsset') };
  get priceMovement() { return this.form.get('priceMovement') };
  get quantityMovement() { return this.form.get('quantityMovement') };
  get dateMovement() { return this.form.get('dateMovement') };

  ngOnInit(): void {

    this.form = this._fb.group({
      "nameAsset" : ['', [Validators.required]],
      "priceMovement": ['', [Validators.required, Validators.min(0)]],
      "quantityMovement": ['', [Validators.required, Validators.min(0)]],
      "typeMovement": [this.typeMovement],
      "dateMovement": [this.date],
    });
  }

  save() {
    const objectToMap = (obj: any) => {
      const keys = Object.keys(obj);
      const map = new Map();
      for(let i = 0; i < keys.length; i++){
        map.set(keys[i], obj[keys[i]]);
      };
      return map;
    };

    this.form.markAsDirty();

    if (this.form.valid) {
      let resultadoForm = new Object(this.form.value);

      const map = objectToMap(resultadoForm);

      const mov: Movement = {
        type: map.get('typeMovement'),
        date: map.get('dateMovement'),
        price: map.get('priceMovement'),
        quantity: map.get('quantityMovement'),
      }

      const nameAsset = map.get('nameAsset');

      if(this.portfolio.assets){

        const existeAsset = this.portfolio.assets!.find(value => {
          if(value.name === nameAsset){
            return true
          }

          return false;
        })

        const indexAsset = this.portfolio.assets!.findIndex(value => value.name == nameAsset);

        if(existeAsset == undefined) {
          if(indexAsset < 0){
            // an asset is created and the first movement that the asset will have is added
            const asset: Asset = {
              name: nameAsset,
              symbol: this.getSymbol(nameAsset),
              movements: [mov],
            }

            this.portfolio.assets!.push(asset);
          }
        }
        else if(existeAsset != undefined)  {
          if(indexAsset >= 0) {
            // the movement is added to the asset that already exists
            this.portfolio.assets[indexAsset].movements?.push(mov);
          }
        }
      }
    }


    const portfolioRequest = {
      userId: this.tokenService.getUser().id,
      portfolio: this.portfolio,
    }

    this.portfolioService.post(portfolioRequest).subscribe( (value: any) => {
      console.log(value)
    }, (err: any) => {
      console.log(err)
    });
  }

  getSymbol(nameCurrencie: string){
    let symbol = '';

    const index = this.coins.findIndex(value =>
      value.name == nameCurrencie
    );

    symbol = this.coins[index].symbol;

    return symbol;
  }

}
