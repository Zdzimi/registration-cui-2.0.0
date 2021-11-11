import { MonthTimetable } from './../../model/monthTimetable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-representatives-timetable',
  templateUrl: './representatives-timetable.component.html',
  styleUrls: ['./representatives-timetable.component.css']
})
export class RepresentativesTimetableComponent implements OnInit {

  monthTimetables: Array<MonthTimetable> = [];
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkService: LinkService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getTimetable(params.get('username'), params.get('institutionName'), params.get('representativeName')).subscribe(
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
    });
  }

  modifyLink(href: string): string {
    return this.linkService.modifyLink(href);
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
}
