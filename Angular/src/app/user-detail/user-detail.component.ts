import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,    
    private messageService: MessageService
    ) { }

  ngOnInit(): void 
  {
    this.getUser();
  }
  getUser(): void 
  {
    var id = this.route.snapshot.paramMap.get('id').toString();
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  save(): void {
    this.userService.updateUser(this.user).subscribe(() => this.goBack());
  }

  goBack(): void
  {
    this.location.back();
  }

}
