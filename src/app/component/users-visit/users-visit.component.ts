import { Visit } from 'src/app/model/visit';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-visit',
  templateUrl: './users-visit.component.html',
  styleUrls: ['./users-visit.component.css']
})
export class UsersVisitComponent implements OnInit {

  visit: Visit;
  error: string;
  username: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkService: LinkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.httpService.getUsersVisit(this.username, params.get('visitId')).subscribe(
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

  modifyLink(href: string): string {
    return this.linkService.modifyLink(href);
  }

  cancelVisit(href: string) {
    this.httpService.cancelVisit(href).subscribe(
      res => {
        this.router.navigate([`/registration/${this.username}/visits`]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
        }
      }
    );
  }
}
