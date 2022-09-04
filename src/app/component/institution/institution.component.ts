import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';
import { Institution } from 'src/app/model/institution';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {

  institution: Institution;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkService: LinkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getInstitution(params.get('username'), params.get('institutionName')).subscribe(
        res => {
          this.institution = res;
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
