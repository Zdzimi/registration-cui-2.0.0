import { HttpService } from 'src/app/service/http.service';
import { WorkPlaceService } from 'src/app/service/work-place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/model/institution';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-work-place-representatives',
  templateUrl: './work-place-representatives.component.html',
  styleUrls: ['./work-place-representatives.component.css']
})
export class WorkPlaceRepresentativesComponent implements OnInit {

  username: string;
  workPlace: Institution;
  navBarWorkPlaceVisible: boolean;
  representatives: Array<User>;
  invitingRepresentative = '';
  error: string;
  inviteError: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workPlaceService: WorkPlaceService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.workPlaceService.getActiveWorkPlaceObs().subscribe(value => {
      this.workPlace = value;
    });
    this.workPlaceService.getNavBarWorkPlaceVisibleObs().subscribe(value => {
      this.navBarWorkPlaceVisible = value;
    });
  }

  ngOnInit(): void {
    this.getRepresentatives();
  }

  getRepresentatives() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.httpService.getWorkPlaceRepresentatives(params.get('username'), params.get('workPlaceName')).subscribe(
        res => {
          this.representatives = res;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            }
            if (err.status === 404) {
              this.error = err.error;
            }
          }
        }
      );
    });
  }

  inviteRepresentative() {
    this.clearInviteError();
    this.httpService.inviteRepresentative(this.username, this.workPlace.institutionName, this.invitingRepresentative).subscribe(
      res => {
        this.invitingRepresentative = '';
        this.getRepresentatives();
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
          if (err.status === 404) {
            this.inviteError = err.error;
            this.invitingRepresentative = '';
          }
          if (err.status === 409) {
            this.inviteError = err.error;
            this.invitingRepresentative = '';
          }
        }
      }
    );
  }

  clearInviteError() {
    this.inviteError = '';
  }

}
