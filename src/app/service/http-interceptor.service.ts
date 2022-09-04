import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.loggedIn) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: this.authService.createBasicAuth(),
        }),
        withCredentials: true
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
