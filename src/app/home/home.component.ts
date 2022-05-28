import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content?: string;
  isLoggedIn = false;

  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }


}
