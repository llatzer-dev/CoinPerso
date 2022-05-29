import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content: string | undefined;
  users: User[] | undefined;

  showDataAsJson: Boolean = false;
  showDataAsTable: Boolean = false;

  constructor(
    private testService: TestService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    this.testService.getAdminBoard().subscribe(
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

  showJSON(){
    this.showDataAsJson = true;
    this.showDataAsTable = false;
  }

  showTable(){
    this.showDataAsTable = true;
    this.showDataAsJson = false;
  }

  delete(id: any) {
    this.userService.deleteById(id).subscribe(
      (data) => {
        console.log(data)
      },
      (err) =>{
        console.log(err)
      }
    );

    window.location.reload();
  }

}
