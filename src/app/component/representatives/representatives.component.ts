import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';

@Component({
  selector: 'app-representatives',
  templateUrl: './representatives.component.html',
  styleUrls: ['./representatives.component.css']
})
export class RepresentativesComponent implements OnInit {

  representatives: Array<User>;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkService: LinkService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getRepresentatives(params.get('username'), params.get('institutionName')).subscribe(
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

  modifyLink(href: string): string {
    return this.linkService.modifyLink(href);
  }
}
