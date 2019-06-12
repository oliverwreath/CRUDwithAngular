import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { User } from '../user-data';
import { UserFetch } from '../user-fetch';



@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html'
})
export class GetUserComponent implements OnInit {
  constructor(private dataservice: DataService) {}


  displayData: boolean;
  user: UserFetch;
  users: User[] = [];
  fetchId = 0;

  idtoUpdate = 0;
  getUsers() {
    this.dataservice.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getUser() {
    this.dataservice.getUser(this.fetchId).subscribe(data => {
      this.user = data;
      this.displayData = true;
    });
  }
  updateUser() {
    this.dataservice.getUser(this.idtoUpdate).subscribe(data => {
      this.user = data;
      this.user.model = 'Updated Model';
      this.dataservice.updateUser(this.user).subscribe(data1 => {
        this.getUsers();
      });
    });
  }


  ngOnInit() {
    this.getUsers();
    this.getUser();
  }

}
