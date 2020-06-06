import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    $(document).ready(function(){
      $(".bg").css("background-image", "url(../../assets/images/Dashboard.jpg)");
    });
  }

  getUsers(): void
  {
    this.userService.getUsers().subscribe(users => this.users = users.slice(0,4));
  }

}
