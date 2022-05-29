import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoinPerso';

  constructor(
  ) { }

}
