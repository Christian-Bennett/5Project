import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { UserService } from '../user.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../user'
import * as $ from 'jquery';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  loginForm: FormGroup;
  un: string;
  pass: string;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:  [this.un],
      password: [this.pass]
    });
  }

  onLogin()
  {
    this.user = this.createUser(this.loginForm.value["username"]);
    //this.userService.loginUser(this.user).subscribe(user => this.user = user)
    this.userService.loginUser(this.user).subscribe(user => {
      let hashCheck = this.decryptr(this.loginForm.value["password"], user.password);
      hashCheck.then(value => {
        if(value){
          this.router.navigate([`/detail/${user.id}`])
        }
        else{
          this.messageService.add("Incorrect Pass");
        }
      });


    });
      
    //   if(this.user.id != '-1')
    //   {
    //     const hashPass = this.decryptr(this.loginForm.value["password"], this.user.password);
    //     hashPass.then(value => {
    //       console.log(value);
    //     });
    //   }

    
    
    // hashPass.then(value => {
    //   this.user.password = value;
    //   this.user.username = this.un
    //   this.messageService.add(this.user.password);
    // });


  }

  decryptr(pass: string, hash: string)
  {
    return new Promise<string>((resolve, reject) => {
      bcrypt.compare(pass, hash, function(err, result) {
        resolve(result);
        reject(err);
      })
    })
  }

  createUser(un: string): User
  {
    return {
      id: '-1',
      username: un,
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
