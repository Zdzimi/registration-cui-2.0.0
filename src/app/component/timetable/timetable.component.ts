import { WorkPlaceService } from 'src/app/service/work-place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Institution } from 'src/app/model/institution';
import { Component, OnInit } from '@angular/core';
import { MonthTimetable } from 'src/app/model/monthTimetable';
import { HttpService } from 'src/app/service/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LinkService } from 'src/app/service/link.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  workPlace: Institution;
  navBarWorkPlaceVisible: boolean;
  monthTimetables: Array<MonthTimetable> = [];
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workPlaceService: WorkPlaceService,
    private httpService: HttpService,
    private router: Router,
    private linkService: LinkService
  ) {
    this.workPlaceService.getActiveWorkPlaceObs().subscribe((value: Institution) => {
      this.workPlace = value;
    });
    this.workPlaceService.getNavBarWorkPlaceVisibleObs().subscribe((value: boolean) => {
      this.navBarWorkPlaceVisible = value;
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit()');
    this.activatedRoute.paramMap.subscribe(params => {
      const username = params.get('username');
      const workPlace = params.get('workPlaceName');
      const year = params.get('year');
      const month = params.get('month');
      const day = params.get('day');
      this.getTimetable(username, workPlace, year, month, day);
    });
  }

  getTimetable(username: string, workPlace: string, year: string, month: string, day: string): void {
    if (day) {
      this.getTimetableByDay(username, workPlace, year, month, day);
    } else if (month) {
      this.getTimetableByMonth(username, workPlace, year, month);
    } else if (year) {
      this.getTimetableByYear(username, workPlace, year);
    }
  }

  getTimetableByYear(username: string, workPlace: string, year: string): void {
    this.httpService.getTimetableByYear(username, workPlace, year).subscribe(
      res => {
        this.monthTimetables = res;
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

  getTimetableByMonth(username: string, workPlace: string, year: string, month: string): void {
    this.httpService.getTimetableByMonth(username, workPlace, year, month).subscribe(
      res => {
        this.monthTimetables = res;
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

  getTimetableByDay(username: string, workPlace: string, year: string, month: string, day: string): void {
    this.httpService.getTimetableByDay(username, workPlace, year, month, day).subscribe(
      res => {
        this.monthTimetables = res;
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
    for (const monthTimetable of this.monthTimetables) {
      const firstDay: Date = new Date(monthTimetable.year, monthTimetable.month - 1, 1);
      const lastDay: Date = new Date(monthTimetable.year, monthTimetable.month - 1, monthTimetable.dayTimetables.length);
      let dayFirst = firstDay.getDay();
      let dayLast = lastDay.getDay();
      if (dayFirst === 0) {
        dayFirst = 7;
      }
      if (dayLast === 0) {
        dayLast = 7;
      }
      monthTimetable.emptyDaysBefore = [];
      monthTimetable.emptyDaysAfter = [];
      while (monthTimetable.emptyDaysBefore.length < dayFirst - 1) {
        monthTimetable.emptyDaysBefore.push(null);
      }
      while (monthTimetable.emptyDaysAfter.length < (7 - dayLast)) {
        monthTimetable.emptyDaysAfter.push(null);
      }
    }
  }

  modifyLink(href: string): string {
    return this.linkService.modifyLink(href);
  }
}
