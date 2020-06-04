import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  user: User = {
    id: "9b8977da-8fd0-4b91-a069-894572cf6150",
    username: "username",
    password: "pass",
    firstName: "name",
    lastName: "name",
    emailAddress: "email",
  };

  constructor(private userService: UserService, private messageService:MessageService) { }

  ngOnInit(): void 
  {
    this.getUsers();
  }

  getUsers(): void
  {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  add(name: string): void 
  {
    this.messageService.add(name);
    name = name.trim();
    if(!name) {return;}
    this.userService.addUser(this.user).subscribe(user => {this.users.push(user)});
  }

  delete(user: User): void 
  {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }

}
