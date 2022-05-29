import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

import { TestService } from './../_services/user.service';
@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {

  content: string | undefined;
  users: User[] | undefined;

  showDataAsJson: Boolean = false;
  showDataAsTable: Boolean = false;

  constructor(
    private testService: TestService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    this.testService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.getUsersSubscribeMethod();
  }

  public getUsersSubscribeMethod() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = JSON.parse(data);

        console.log('GET USERS TABLA')
        console.log(this.users)
      },
      err => {
        console.log(err)
      }
    );

  }

}
