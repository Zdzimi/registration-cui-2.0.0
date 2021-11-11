import { BehaviorSubject, Observable } from 'rxjs';
import { Institution } from './../model/institution';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkPlaceService {

  activeWorkPlace: Institution = null;
  navBarWorkPlaceVisible = true;
  activeWorkPlaceObs = new BehaviorSubject<Institution>(this.activeWorkPlace);
  navBarWorkPlaceVisibleObs = new BehaviorSubject<boolean>(this.navBarWorkPlaceVisible);

  constructor() { }

  getActiveWorkPlaceObs(): Observable<Institution> {
    return this.activeWorkPlaceObs.asObservable();
  }

  getNavBarWorkPlaceVisibleObs(): Observable<boolean> {
    return this.navBarWorkPlaceVisibleObs.asObservable();
  }

  setActiveWorkPlace(woekPlace: Institution) {
    this.activeWorkPlace = woekPlace;
    this.activeWorkPlaceObs.next(this.activeWorkPlace);
  }

  setNavBarWorkPlaceVisible(value: boolean) {
    this.navBarWorkPlaceVisible = value;
    this.navBarWorkPlaceVisibleObs.next(this.navBarWorkPlaceVisible);
  }
}
