import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { UserService } from '../user.service'
import { ActivatedRoute } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { User } from '../user'

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
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:  [this.un],
      password: [this.pass]
    });
  }

  onLogin()
  {
    this.user = this.createUser();
    this.un = this.loginForm.value["username"];
    //this.pass = ;
    let hashPass = this.encryptr(this.loginForm.value["password"]);
    
    hashPass.then(value => {
      

      this.user.password = value;
      this.user.username = this.un
      this.messageService.add(this.user.password);
      this.userService.loginUser(this.user).subscribe(user => this.user = user);
    }).then(() => {
      //this.user.password = value;
      //this.user.username = this.un;
      if(this.user.id == '-1')
      {
        this.messageService.add("Login Failed");
      }
      else{
        this.messageService.add("Login Yay!");
      }
    })
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

  createUser(): User
  {
    return {
      id: '-1',
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
