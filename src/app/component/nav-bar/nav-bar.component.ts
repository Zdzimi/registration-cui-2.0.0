import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Institution } from 'src/app/model/institution';
import { SearchObject } from 'src/app/model/searchObject';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';
import { LinkService } from 'src/app/service/link.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: User;
  advancedSearchingVisible = false;
  searchObject = new SearchObject();
  workPlaces: Array<Institution>;
  workPlacesHidden = true;

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private linkService: LinkService,
    private router: Router
  ) {
    this.userService.getUserObs().subscribe((value: User) => {
      this.user = value;
    });
  }

  ngOnInit(): void {
  }

  clickAdvancedSearching() {
    this.advancedSearchingVisible = !this.advancedSearchingVisible;
  }

  cancelAdvancedSearching() {
    this.searchObject = new SearchObject();
    this.advancedSearchingVisible = false;
  }

  navigateTo(href: string) {
    this.cancelAdvancedSearching();
    this.router.navigate([this.linkService.modifyLink(href)]);
  }

  navigateToInstitutions(href: string) {
    let url = this.linkService.modifyLink(href);
    url = url.replace('pInstitutionName', this.searchObject.institutionName);
    url = url.replace('pProvince', this.searchObject.province);
    url = url.replace('pCity', this.searchObject.city);
    url = url.replace('pTypeOfService', this.searchObject.typeOfService);
    this.router.navigate([url]);
    this.cancelAdvancedSearching();
  }

  showYourWorkPlaces() {
    this.workPlacesHidden = !this.workPlacesHidden;
    if (!this.workPlacesHidden) {
      this.httpService.getWorkPlaces(this.user.username).subscribe(
        res => {
          this.workPlaces = res;
        }
      );
    }
  }

}
