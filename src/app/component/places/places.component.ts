import { DeletePlaceErrorResponse } from './../../model/deletePlaceErrorResponse';
import { Violations } from 'src/app/model/violations';
import { WorkPlaceService } from './../../service/work-place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Place } from 'src/app/model/place';
import { Institution } from 'src/app/model/institution';
import { CreatingPlace } from 'src/app/model/creatingPlace';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  username: string;
  workPlace: Institution;
  navBarWorkPlaceVisible: boolean;
  places: Array<Place>;
  creatingPlace = new CreatingPlace();
  error: string;
  deletePlaceErrorResponse: DeletePlaceErrorResponse;
  violations: Violations;
  placeNameViolation: string;
  placeNameError: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workPlaceService: WorkPlaceService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.workPlaceService.getActiveWorkPlaceObs().subscribe((value: Institution) => {
      this.workPlace = value;
    });
    this.workPlaceService.getNavBarWorkPlaceVisibleObs().subscribe((value: boolean) => {
      this.navBarWorkPlaceVisible = value;
    });
  }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.httpService.getPlaces(params.get('username'), params.get('workPlaceName')).subscribe(
        res => {
          this.places = res;
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

  createPlace() {
    this.clearViolationAndError();
    this.httpService.createPlace(this.username, this.workPlace.institutionName, this.creatingPlace).subscribe(
      res => {
        this.creatingPlace = new CreatingPlace();
        this.getPlaces();
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
          if (err.status === 400) {
            this.violations = err.error;
            this.setViolation();
          }
          if (err.status === 409) {
            this.placeNameError = err.error;
          }
        }
      }
    );
  }

  clearViolationAndError() {
    this.placeNameViolation = '';
    this.placeNameError = '';
    this.deletePlaceErrorResponse = null;
  }

  setViolation() {
    for (const violation of this.violations.violations) {
      switch (violation.fieldName) {
        case 'placeName':
          this.placeNameViolation = violation.message;
          break;
      }
    }
  }

  delete(href: string) {
    this.clearViolationAndError();
    this.httpService.deletePlace(href).subscribe(
      res => {
        this.getPlaces();
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
          if (err.status === 409) {
            this.deletePlaceErrorResponse = err.error;
          }
        }
      }
    );
  }
}
