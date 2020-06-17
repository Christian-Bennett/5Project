import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap,} from 'rxjs/operators';

import { User } from './user';
import { Observable, of } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UsersUrl = `https://localhost:5001/Users/`;
  user: User;

  httpOptions = 
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
    this.messageService.add(`UserService: Fetching User id=${uId}`)
    const options = uId ?
    { params: new HttpParams().set('id', uId) } : {};
    return this.http.get<User>(`${this.UsersUrl}GetOne`, options).pipe(
      tap(_ => this.log(`Fetched User id=${uId}`)),
      catchError(this.handleError<User>(`getUser id=${uId}`))
    )
  }

  updateUser(user: User): Observable<any>
  {
      return this.http.put(`${this.UsersUrl}Put`, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated User id=${user.id}`)),
      catchError(this.handleError('updateUser'))
    )    
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.UsersUrl}Post`, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added User w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    )
  }

  deleteUser(user: User | string): Observable<User> 
  {
    const uId = typeof user === 'string' ? user : user.id;
    const options = uId ?
    { params: new HttpParams().set('id', uId) } : {};

    return this.http.delete<User>(`${this.UsersUrl}Delete`, options).pipe(
      tap(_ => this.log(`deleted user id=${uId}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
  encryptr(user: User)
  {
  }  
}


