import { user } from './../../../../../../project/swpp18-team3/SNU-slam/src/app/room/list.service';
import {Injectable, Output} from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap , map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean;
  current_user: User;
  baseUrl = environment.API_URL;

  private userUrl = this.baseUrl + '/api/user';
  private signUrl = this.baseUrl + '/api/sign_in';
  private signOutUrl = this.baseUrl + '/api/sign_out';
  private tokenUrl =  this.baseUrl + '/api/token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  postUser(user: User): Observable<User> {
    this.getCSRFHeaders();
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(catchError(this.handleError<User>('postUser')));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(tap(_ => this.log('fetched users')),
        catchError(this.handleError('getUsers', [])));
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.userUrl}/?username=${term}`)
      .pipe(tap(_ => this.log(`found users matching "${term}"`)),
        catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  login(email: string, password: string): Observable<User> {
    this.getCSRFHeaders();
    const data = JSON.stringify({ email: email, password: password });

    return this.http.post<User>(this.signUrl, data, httpOptions)
  }

  getCSRFHeaders(): HttpHeaders {
    let token = '';
    if (document.cookie) {
      token = document.cookie.split('csrftoken=')[1].split(';')[0];
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': token
    });
  }
  getCSRFToken(): Observable<void> {
    return this.http.get<void>(this.tokenUrl, httpOptions);
  }

  logout(): Observable<User> {
    this.isLoggedIn = false;
    this.current_user = undefined;
    return this.http.get<User>(this.signOutUrl);
  }

  getUser(): User {
    const id = parseInt(localStorage.getItem('user_id'), 10);
    if ( id ) {
      return this.current_user;
    } else {
      return;
    }
  }

  private log(message: string) {
    console.log(`UserService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return Promise.resolve(result as T);
    };
  }



}
