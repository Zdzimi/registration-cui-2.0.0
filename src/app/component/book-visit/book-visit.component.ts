import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Visit } from 'src/app/model/visit';

@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.css']
})
export class BookVisitComponent implements OnInit {

  visit: Visit;
  username: string;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkService: LinkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('username');
      this.httpService.getVisit(
        this.username,
        params.get('institutionName'),
        params.get('representativeName'),
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

  modifyLink(href: string): string {
    return this.linkService.modifyLink(href);
  }

  bookVisit(href: string) {
    this.httpService.bookVisit(href).subscribe(
      res => {
        this.router.navigate([`/registration/${this.username}/visits`]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
        }
        console.log(err);
      }
    );
  }
}
