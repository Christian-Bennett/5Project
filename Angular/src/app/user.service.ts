import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private log(message: string)
  {
    this.messageService.add(`UserService: ${message}`);
  }

  getUsers(): Observable<User[]>
  {
    this.messageService.add("UserService: Fetched Users")
    return of(USERS);
  }

  getUser(id: number): Observable<User>
  {
    this.messageService.add(`UserService: Fetched User id=${id}`)
    return of(USERS.find(user => user.id === id))
  }

  
}
