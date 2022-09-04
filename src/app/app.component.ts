import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'registration-cui';
  loggedIn: boolean;
  navBarHidden = false;

  constructor(private authService: AuthenticationService) {
    this.authService.getLoggedInObs().subscribe((value: boolean) => {
      this.loggedIn = value;
    });
  }

  setNavBarHiddenValue(value: boolean) {
    this.navBarHidden = value;
  }
}
