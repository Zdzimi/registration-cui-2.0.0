import { TimetableTemplate } from './../../model/timetableTemplate';
import { Institution } from 'src/app/model/institution';
import { HttpService } from 'src/app/service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkPlaceService } from 'src/app/service/work-place.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-timetable-template',
  templateUrl: './timetable-template.component.html',
  styleUrls: ['./timetable-template.component.css']
})
export class TimetableTemplateComponent implements OnInit {

  username: string;
  workPlace: Institution;
  navBarWorkPlaceVisible: boolean;
  timetableTemplate: TimetableTemplate;

  emptyDaysBefore: Array<string>;
  emptyDaysAfter: Array<string>;

  badRequestError: string;
  error: string;
  conflicts: Array<string> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private workPlaceService: WorkPlaceService,
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
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username');
      const username = params.get('username');
      const workPlaceName = params.get('workPlaceName');
      const year = params.get('year');
      const month = params.get('month');
      this.clearErrors();
      if (year && month) {
        this.getTimetableTemplate(username, workPlaceName, year, month);
      } else {
        this.getNextTimetableTemplate(username, workPlaceName);
      }
    });
  }

  clearErrors() {
    this.error = '';
    this.badRequestError = '';
    this.conflicts = [];
  }

  getTimetableTemplate(username: string, workPlaceName: string, year: string, month: string) {
    this.httpService.getTimetableTemplate(username, workPlaceName, year, month).subscribe(
      res => {
        this.timetableTemplate = res;
        this.setEmptyDays();
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.badRequestError = err.error;
          }
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
          if (err.status === 404) {
            this.error = err.error;
          }
        }
      }
    );
  }

  getNextTimetableTemplate(username: string, workPlaceName: string) {
    this.httpService.getNextTimetableTemplate(username, workPlaceName).subscribe(
      res => {
        this.timetableTemplate = res;
        this.setEmptyDays();
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
  }

  setEmptyDays() {
    this.emptyDaysBefore = [];
    this.emptyDaysAfter = [];
    let firstDay = this.getDay(0);
    let lastDay = this.getDay(this.timetableTemplate.days.length - 1);
    if (firstDay === 0) {
      firstDay = 7;
    }
    while (this.emptyDaysBefore.length < firstDay - 1) {
      this.emptyDaysBefore.push(null);
    }
    if (lastDay === 0) {
      lastDay = 7;
    }
    while (this.emptyDaysAfter.length < 7 - lastDay) {
      this.emptyDaysAfter.push(null);
    }
  }

  getDay(day: number): number {
    return new Date(this.timetableTemplate.year, this.timetableTemplate.month - 1, this.timetableTemplate.days[day].dayOfMonth).getDay();
  }

  sendTemplate() {
    this.httpService.sendTimetableTemplate(this.username, this.workPlace.institutionName, this.timetableTemplate).subscribe(
      res => {
        this.router.navigate([`/registration/${this.username}/work-place/${this.workPlace.institutionName}/year/${this.timetableTemplate.year}/month/${this.timetableTemplate.month}`]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
          if (err.status === 409) {
            this.conflicts = err.error;
          }
        }
      }
    );
  }

  tryAgain() {
    this.conflicts = [];
  }
}
