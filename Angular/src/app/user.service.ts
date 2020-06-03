import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UsersUrl = `https://localhost:5001/Users/`;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private log(message: string)
  {
    this.messageService.add(`UserService: ${message}`);
  }

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(`${this.UsersUrl}Get`).pipe(
      tap(_ => this.log('Fetched Users')),
      
      catchError(this.handleError<User[]>('getUsers', []))
    )
  }

  getUser(uId: string): Observable<User>
  {
    let u2: User;
    this.messageService.add(`UserService: Fetching User id=${uId}`)
    const options = uId ?
    { params: new HttpParams().set('id', uId) } : {};
    return this.http.get<User>(`${this.UsersUrl}GetOne`, options).pipe(
      tap(_ => this.log(`Fetched User id=${uId}`)),
      catchError(this.handleError<User>(`getUser id=${uId}`))
    )
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
