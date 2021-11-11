import { WorkPlaceService } from './../../service/work-place.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institution } from 'src/app/model/institution';
import { HttpService } from 'src/app/service/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-work-place',
  templateUrl: './work-place.component.html',
  styleUrls: ['./work-place.component.css']
})
export class WorkPlaceComponent implements OnInit {

  workPlace: Institution;
  navBarWorkPlaceVisible: boolean;
  error: string;

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
      this.httpService.getWorkPlace(params.get('username'), params.get('workPlaceName')).subscribe(
        res => {
          this.workPlace = res;
          this.workPlaceService.setActiveWorkPlace(this.workPlace);
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
}
