import { Violation } from './../../model/violation';
import { Violations } from 'src/app/model/violations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreatingWorkPlace } from 'src/app/model/creatingWorkPlace';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-work-place-creator',
  templateUrl: './work-place-creator.component.html',
  styleUrls: ['./work-place-creator.component.css']
})
export class WorkPlaceCreatorComponent implements OnInit {

  user: User;
  creatingWorkPlace = new CreatingWorkPlace();

  violations: Violations;
  institutionNameAlreadyExistsInfo: string;
  institutionNameViolation: string;
  provinceViolation: string;
  cityViolation: string;
  streetViolation: string;
  gateNumberViolation: string;
  typeOfServiceViolation: string;
  descriptionViolation: string;

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.userService.getUserObs().subscribe((value: User) => {
      this.user = value;
    });
  }

  ngOnInit(): void {
    if (!this.userService.user) {
      this.router.navigate(['/']);
    }
  }

  createWorkPlace() {
    this.clearViolations();
    this.httpService.createWorkPlace(this.user.username, this.creatingWorkPlace).subscribe(
      res => {
        this.router.navigate([`/registration/${this.user.username}/work-place/${this.creatingWorkPlace.institutionName}`]);
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.institutionNameAlreadyExistsInfo = 'Nazwa placówki już istnieje';
          }
          if (err.status === 400) {
            this.violations = err.error;
            this.createViolations();
          }
        }
      }
    );
  }

  clearViolations() {
    this.institutionNameAlreadyExistsInfo = null;
    this.institutionNameViolation = null;
    this.provinceViolation = null;
    this.cityViolation = null;
    this.streetViolation = null;
    this.gateNumberViolation = null;
    this.typeOfServiceViolation = null;
    this.descriptionViolation = null;
  }

  createViolations() {
    for (const violation of this.violations.violations) {
      switch (violation.fieldName) {
        case 'institutionName':
          this.institutionNameViolation = violation.message;
          break;
        case 'province':
          this.provinceViolation = violation.message;
          break;
        case 'city':
          this.cityViolation = violation.message;
          break;
        case 'street':
          this.streetViolation = violation.message;
          break;
        case 'gateNumber':
          this.gateNumberViolation = violation.message;
          break;
        case 'typeOfService':
          this.typeOfServiceViolation = violation.message;
          break;
        case 'description':
          this.descriptionViolation = violation.message;
          break;
      }
    }
  }

}
