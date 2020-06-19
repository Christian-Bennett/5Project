import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { v4 as uuid } from 'uuid';

import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import { tap, subscribeOn } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import * as $ from 'jquery';

//declare var hashPass: any;

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
    

    if(id.length == 36){
      this.getUser(id);
    }
    else{
      await this.createUser().then(user => this.user = user).then(
        user => this.buildForm(user));
    }

  }
  getUser(id: string): void 
  {
    this.flag = true;
    this.userService.getUser(id).pipe(tap(
      user => this.buildForm(user)))
      .subscribe(user => this.user = user);
      // this.form.controls['username'].disable();
      // this.form.controls['password'].disable();
      // this.form.controls['id'].disable();
  }

  onUpdate(){
    this.user = this.form.value;
    
    let hashProm = this.encryptr(this.user.password);
    hashProm.then(value => {
      this.user.password = value;
      this.userService.updateUser(this.user).subscribe(() => this.goBack());    
    })
  }

  onSubmit(): void {
 
    this.user = this.form.value;
    let hashProm = this.encryptr(this.user.password);
    hashProm.then(value => {
      this.user.password = value;
      this.userService.addUser(this.user).subscribe(() => this.goBack());
    })
  }

  goBack(): void
  {
    this.location.back();
  }

  buildForm(user: User): void
  {
    this.form = this.formBuilder.group({
      id:  [user.id],
      username:  [user.username, Validators.required],
      password: [user.password],
      firstName:  [user.firstName, Validators.required],
      lastName:  [user.lastName, Validators.required],
      emailAddress:  [user.emailAddress, Validators.required],
      address: this.formBuilder.group({
        street:  [user.address.street, Validators.required],
        city:  [user.address.city, Validators.required],
        state:  [user.address.state, Validators.required],
        zip:  [user.address.zip, Validators.required]
      })
    })
  }

  async createUser()
  {
    return {
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
      }
    }
  }

  encryptr(pass: string)
  {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(pass, 11, function(err, hash) {
        resolve(hash);
        reject(err);
      })
    })
  }
}


