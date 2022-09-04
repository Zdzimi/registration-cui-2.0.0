import { Visit } from './../../model/visit';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-visits',
  templateUrl: './users-visits.component.html',
  styleUrls: ['./users-visits.component.css']
})
export class UsersVisitsComponent implements OnInit {

  visits: Array<Visit> = [];
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkService: LinkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paarams => {
      this.httpService.getUsersVisits(paarams.get('username')).subscribe(
        res => {
          this.visits = res;
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
}
