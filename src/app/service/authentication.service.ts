import { Credentials } from './../model/credentials';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn = false;
  loggedInObs = new BehaviorSubject<boolean>(this.loggedIn);

  constructor() {
    this.loggedIn = !!localStorage.getItem('username');
    this.loggedInObs.next(this.loggedIn);
  }

  getLoggedInObs(): Observable<boolean> {
    return this.loggedInObs.asObservable();
  }

  setCredentials(credentials: Credentials) {
    localStorage.setItem('username', credentials.username);
    localStorage.setItem('auth', btoa(`${credentials.username}:${credentials.password}`));
    this.loggedIn = true;
    this.loggedInObs.next(this.loggedIn);
  }

  clearCredentials() {
    localStorage.removeItem('username');
    localStorage.removeItem('auth');
    this.loggedIn = false;
    this.loggedInObs.next(this.loggedIn);
  }

  createBasicAuth() {
    return 'Basic ' + localStorage.getItem('auth');
  }
}
