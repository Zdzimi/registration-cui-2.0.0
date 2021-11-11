import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Visit } from 'src/app/model/visit';
import { WorkPlaceService } from 'src/app/service/work-place.service';
import { HttpService } from 'src/app/service/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {

  visit: Visit;
  navBarWorkPlaceVisible: boolean;
  error: string;

  username: string;
  workPlaceName: string;
  year: string;
  month: string;
  deletingError: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private workPlaceService: WorkPlaceService,
    private router: Router
  ) {
    this.workPlaceService.getNavBarWorkPlaceVisibleObs().subscribe((value: boolean) => {
      this.navBarWorkPlaceVisible = value;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.workPlaceName = params.get('workPlaceName');
      this.year = params.get('year');
      this.month = params.get('month');
      this.httpService.getVisitDetails(
        this.username,
        this.workPlaceName,
        this.year,
        this.month,
        params.get('day'),
        params.get('visitId')
      ).subscribe(
        res => {
          this.visit = res;
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

  deleteVisit(href: string) {
    this.httpService.deleteVisit(href).subscribe(
      res => {
        this.router.navigate([`/registration/${this.username}/work-place/${this.workPlaceName}/year/${this.year}/month/${this.month}`]);
      },
      err => {
        this.deletingError = err.error;
      }
    );
  }
}
