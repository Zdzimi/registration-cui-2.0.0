import { HttpService } from 'src/app/service/http.service';
import { YearMonthDay } from './../../model/yearMonthDay';
import { WorkPlaceService } from './../../service/work-place.service';
import { Institution } from './../../model/institution';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LinkService } from 'src/app/service/link.service';
import { YearMonth } from 'src/app/model/yearMonth';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav-bar-work-place',
  templateUrl: './nav-bar-work-place.component.html',
  styleUrls: ['./nav-bar-work-place.component.css']
})
export class NavBarWorkPlaceComponent implements OnInit {

  user: User;
  workPlace: Institution;
  navBarWorkPlaceVisible: boolean;
  yearMonth = new YearMonth();
  yearMonthDay = new YearMonthDay();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private httpService: HttpService,
    private workPlaceService: WorkPlaceService,
    private linkService: LinkService,
    private router: Router
  ) {
    this.userService.getUserObs().subscribe((value: User) => {
      this.user = value;
    });
    this.workPlaceService.getActiveWorkPlaceObs().subscribe((value: Institution) => {
      this.workPlace = value;
    });
    this.workPlaceService.getNavBarWorkPlaceVisibleObs().subscribe((value: boolean) => {
      this.navBarWorkPlaceVisible = value;
    });
  }

  ngOnInit(): void {
    if (!this.workPlace) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.getWorkPlace(params.get('username'), params.get('workPlaceName'));
      });
    }
  }

  getWorkPlace(username: string, workPlaceName: string) {
    this.httpService.getWorkPlace(username, workPlaceName).subscribe(
      res => {
        this.workPlaceService.setActiveWorkPlace(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  showOrHide(value: boolean) {
    this.workPlaceService.setNavBarWorkPlaceVisible(value);
  }

  navigateTo(href: string) {
    this.router.navigate([this.linkService.modifyLink(href)]);
  }

  getTimetableTemplate() {
    if (this.yearMonth.year && this.yearMonth.month) {
      this.router.navigate([`registration/${this.user.username}/work-place/${this.workPlace.institutionName}/year/${this.yearMonth.year}/month/${this.yearMonth.month}/get-template`]);
    }
    this.yearMonth = new YearMonth();
  }

  showTimetable() {
    if (this.yearMonthDay.day && this.yearMonthDay.month && this.yearMonthDay.year) {
      this.router.navigate([`registration/${this.user.username}/work-place/${this.workPlace.institutionName}/year/${this.yearMonthDay.year}/month/${this.yearMonthDay.month}/day/${this.yearMonthDay.day}`]);
    } else if (this.yearMonthDay.month && this.yearMonthDay.year) {
      this.router.navigate([`registration/${this.user.username}/work-place/${this.workPlace.institutionName}/year/${this.yearMonthDay.year}/month/${this.yearMonthDay.month}`]);
    } else if (this.yearMonthDay.year) {
      this.router.navigate(
        [`registration/${this.user.username}/work-place/${this.workPlace.institutionName}/year/${this.yearMonthDay.year}`]
        );
    }
    this.yearMonthDay = new YearMonthDay();
  }
}
