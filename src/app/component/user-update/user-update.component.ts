import { ModifiedUser } from './../../model/modifiedUser';
import { Credentials } from './../../model/credentials';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Violations } from 'src/app/model/violations';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  modifiedUser = new ModifiedUser();
  username: string;

  okInfo: string;
  badPasswordInfo: string;
  usernameAlreadyExsistInfo: string;

  violations: Violations;
  usernameViolation: string;
  nameViolation: string;
  surnameViolation: string;
  emailViolation: string;
  passwordViolation: string;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  cleanMessages() {
    this.badPasswordInfo = null;
    this.usernameAlreadyExsistInfo = null;
    this.usernameViolation = null;
    this.nameViolation = null;
    this.surnameViolation = null;
    this.emailViolation = null;
    this.passwordViolation = null;
  }

  updateUser() {
    this.cleanMessages();
    this.username = this.userService.user.username;
    this.httpService.updateUser(this.modifiedUser, this.username).subscribe(
      res => {
        const credentials = new Credentials();
        credentials.username = this.modifiedUser.username;
        credentials.password = this.modifiedUser.newPassword;
        this.authService.setCredentials(credentials);
        this.okInfo = 'Znieniono dane';
        setTimeout(() => {
          this.navigateTo();
        }, 1000);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.usernameAlreadyExsistInfo = 'Nazwa użytkownika już istnieje';
          }
          if (err.status === 403) {
            this.badPasswordInfo = 'złe hasło';
          }
          if (err.status === 400) {
            this.violations = err.error;
            this.createViolations();
            this.modifiedUser = new ModifiedUser();
          }
        }
      }
    );
  }

  navigateTo() {
    this.router.navigate(['/registration/' + this.modifiedUser.username]);
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
        case 'newPassword':
          this.passwordViolation = violation.message;
      }
    }
  }
}
