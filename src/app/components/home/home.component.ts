import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content?: string;
  isLoggedIn = false;

  constructor(
    private userService: TestService,
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
