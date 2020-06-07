import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { v4 as uuid } from 'uuid';

import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location, JsonPipe } from '@angular/common';

import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import { tap, subscribeOn } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  form: FormGroup;
  flag: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,    
    private formBuilder: FormBuilder,
    private messageService: MessageService
    ) { }

  async ngOnInit()
  {
    let id = this.route.snapshot.paramMap.get('id').toString();
    this.form = this.formBuilder.group({
      id:  [''],
      username:  ['', Validators.required],
      password: [''],
      firstName:  ['', Validators.required],
      lastName:  ['', Validators.required],
      emailAddress:  ['', Validators.required],
      address: this.formBuilder.group({
        street:  ['', Validators.required],
        city:  ['', Validators.required],
        state:  ['', Validators.required],
        zip:  ['', Validators.required]
      })
    });

    if(id.length == 36){
      this.getUser(id);
    }
    else{
      await this.createUser().then(user => this.user = user).then(
        user => this.form.patchValue({
          id: uuid(),
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          emailAddress: '',
          address: {
            street: '',
            city: '',
            state: '',
            zip: 0
          }})
      )
    }
    


  }
  getUser(id: string): void 
  {
    this.flag = true;
    this.userService.getUser(id).pipe(tap(
      user => this.form.patchValue({
        id: user.id,
        username: user.username,
        password: '**********',
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        address: {
          street: user.address.street,
          city: user.address.city,
          state: user.address.state,
          zip: user.address.zip
        }
      })))
      .subscribe(user => this.user = user);
      // this.form.controls['username'].disable();
      // this.form.controls['password'].disable();
      // this.form.controls['id'].disable();
  }

  onUpdate(): void {
    //console.warn(this.form.value);
    this.user = this.form.value;
    this.userService.updateUser(this.user).subscribe(() => this.goBack());
  }

  onSubmit(): void {
    //console.warn(this.form.value);
    this.user = this.form.value;
    this.userService.addUser(this.user).subscribe(() => this.goBack());
  }

  goBack(): void
  {
    this.location.back();
  }

  async createUser()
  {
    return {
      id: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: 0
      }
    }
  }
}
