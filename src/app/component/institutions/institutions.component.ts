import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institution } from 'src/app/model/institution';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})
export class InstitutionsComponent implements OnInit {

  institutions: Array<Institution> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkService: LinkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getInstitutions(params.get('username'), params.get('searchingVariable')).subscribe(
        res => {
          this.institutions = res;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
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
