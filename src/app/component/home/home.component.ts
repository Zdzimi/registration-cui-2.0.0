import { Violations } from './../../model/violations';
import { Violation } from './../../model/violation';
import { HttpService } from './../../service/http.service';
import { AuthenticationService } from './../../service/authentication.service';
import { AddingUser } from './../../model/addingUser';
import { Credentials } from './../../model/credentials';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  credentials = new Credentials();
  addingUser = new AddingUser();
  loginView = true;
  errorLogin: string;
  errorRegistry: string;
  violations: Violations;
  usernameViolation: string;
  nameViolation: string;
  surnameViolation: string;
  emailViolation: string;
  passwordViolation: string;

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.router.navigate(['/registration/' + localStorage.getItem('username')]);
    }
  }

  showLogin() {
    this.loginView = true;
    this.clearViolations();
  }

  showRegistry() {
    this.loginView = false;
    this.clearViolations();
    this.addingUser = new AddingUser();
  }

  clearViolations() {
    this.errorLogin = null;
    this.errorRegistry = null;
    this.usernameViolation = null;
    this.nameViolation = null;
    this.surnameViolation = null;
    this.emailViolation = null;
    this.passwordViolation = null;
  }

  login() {
    this.authService.setCredentials(this.credentials);
    this.httpService.getUser(this.credentials.username).subscribe(
      res => {
        this.router.navigate(['/registration/' + this.credentials.username]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.errorLogin = 'Złe dane';
          }
        }
        this.authService.clearCredentials();
        this.credentials = new Credentials();
      }
    );
  }

  registry() {
    this.clearViolations();
    this.httpService.createUser(this.addingUser).subscribe(
      res => {
        this.authService.setCredentials(
          {
            username : this.addingUser.username,
            password : this.addingUser.password
          }
          );
        this.router.navigate(['/registration/' + this.addingUser.username]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.errorRegistry = 'Nazwa użytkownika już istnieje';
          }
          if (err.status === 400) {
            this.violations = err.error;
            this.createViolations();
          }
        }
      }
    );
  }

  createViolations() {
    for (const violation of this.violations.violations) {
      switch (violation.fieldName) {
        case 'username':
          this.usernameViolation = violation.message;
          break;
        case 'name':
          this.nameViolation = violation.message;
          break;
        case 'surname':
          this.surnameViolation = violation.message;
          break;
        case 'email':
          this.emailViolation = violation.message;
          break;
        case 'password':
          this.passwordViolation = violation.message;
      }
    }
  }
}
