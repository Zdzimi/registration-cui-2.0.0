import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = null;
  userObs = new BehaviorSubject<User>(this.user);

  constructor(private httpService: HttpService) {
    this.initUser();
  }

  initUser() {
    const username = localStorage.getItem('username');
    if (username) {
      this.httpService.getUser(username).subscribe(
        res => {
          this.setUser(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getUserObs(): Observable<User> {
    return this.userObs.asObservable();
  }

  setUser(user: User) {
    this.user = user;
    this.userObs.next(this.user);
  }

  clearUser() {
    this.user = null;
    this.userObs.next(this.user);
  }
}
