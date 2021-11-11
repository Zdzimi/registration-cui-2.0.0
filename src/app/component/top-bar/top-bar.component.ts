import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  loggedIn: boolean;

  @Input()
  navBarHidden: boolean;

  @Output()
  eventNavBar = new EventEmitter<boolean>();

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService,
    private router: Router
  ) {
    authService.getLoggedInObs().subscribe((value: boolean) => {
      this.loggedIn = value;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.httpService.logout().subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => {
        this.authService.clearCredentials();
        this.router.navigate(['/']);
      }
    );
  }

  showOrHideNavBar() {
    this.eventNavBar.emit(!this.navBarHidden);
  }

}
