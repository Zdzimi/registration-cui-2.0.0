import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.userService.getUserObs().subscribe((value: User) => {
      this.user = value;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getUser(params.get('username')).subscribe(
        res => {
          this.user = res;
          this.userService.setUser(this.user);
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authService.clearCredentials();
              this.router.navigate(['/']);
            }
          }
        }
      );
    });
  }

}
