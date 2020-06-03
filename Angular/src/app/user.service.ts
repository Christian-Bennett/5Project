import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UsersUrl2 = `https://localhost:5001/Users/`;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private log(message: string)
  {
    this.messageService.add(`UserService: ${message}`);
  }

  getUsers(): Observable<User[]>
  {
    this.messageService.add("UserService: Fetched Users");
    

    return this.http.get<User[]>(this.UsersUrl2.concat("Get")).pipe(
      tap(_ => this.log('fetched heroes')),
      
      catchError(this.handleError<User[]>('getUsers', []))
    )
  }

  getUser(id: string): Observable<User>
  {
    this.messageService.add(`UserService: Fetched User id=${id}`)
    return of(USERS.find(user => user.id === id))
  }

  private handleError<T>(operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  
}
