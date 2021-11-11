import { ModifiedUser } from './../model/modifiedUser';
import { MonthTimetable } from './../model/monthTimetable';
import { TimetableTemplate } from './../model/timetableTemplate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddingUser } from './../model/addingUser';
import { Institution } from '../model/institution';
import { User } from '../model/user';
import { Place } from '../model/place';
import { CreatingPlace } from '../model/creatingPlace';
import { CreatingWorkPlace } from '../model/creatingWorkPlace';
import { Visit } from '../model/visit';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:8080/registration/';

  constructor(private httpClient: HttpClient) { }

  createUser(addingUser: AddingUser): Observable<any> {
    return this.httpClient.post<AddingUser>(this.url + 'new-user', addingUser);
  }

  updateUser(modifiedUser: ModifiedUser, username: string): Observable<any> {
    return this.httpClient.patch<any>(this.url + username + '/update-user', modifiedUser);
  }

  createWorkPlace(username: string, creatingWorkPlace: CreatingWorkPlace): Observable<any> {
    return this.httpClient.post<any>(`${this.url + username}/new-work-place`, creatingWorkPlace);
  }

  logout(): Observable<any> {
  return this.httpClient.get<any>('http://localhost:8080/logout');
  }

  getUser(username: string): Observable<User> {
    return this.httpClient.get<User>(this.url + username);
  }

  getInstitutions(username: string, searchingVariable: string): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(`${this.url + username}/institutions/${searchingVariable}`);
  }

  getInstitution(username: string, institutionName: string): Observable<Institution> {
    return this.httpClient.get<Institution>(`${this.url + username}/institution/${institutionName}`);
  }

  getRepresentatives(username: string, institutionName: string): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.url + username}/institution/${institutionName}/representatives`);
  }

  getRepresentative(username: string, institutionName: string, representativeName: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url + username}/institution/${institutionName}/representatives/${representativeName}`);
  }

  getTimetable(username: string, institutionName: string, representativeName: string): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>(`${this.url + username}/institution/${institutionName}/representatives/${representativeName}/timetable`);
  }

  getVisit(username: string, institutionName: string, representativeName: string, visitId: string): Observable<Visit> {
    return this.httpClient.get<Visit>(`${this.url + username}/institution/${institutionName}/representatives/${representativeName}/timetable/${visitId}`);
  }

  bookVisit(href: string): Observable<any> {
    return this.httpClient.patch<any>(href, null);
  }

  getUsersVisits(username: string): Observable<Array<Visit>> {
    return this.httpClient.get<Array<Visit>>(`${this.url + username}/visits`);
  }

  getUsersVisit(username: string, visitId: string): Observable<Visit> {
    return this.httpClient.get<Visit>(`${this.url + username}/visits/${visitId}`);
  }

  cancelVisit(href: string): Observable<any> {
    return this.httpClient.patch<any>(href, null);
  }

  getWorkPlaces(username: string): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(`${this.url + username}/work-places`);
  }

  getWorkPlace(username: string, workPlaceName: string): Observable<Institution> {
    return this.httpClient.get<Institution>(`${this.url + username}/work-place/${workPlaceName}`);
  }

  getPlaces(username: string, workPlaceName: string): Observable<Array<Place>> {
    return this.httpClient.get<Array<Place>>(`${this.url + username}/work-place/${workPlaceName}/places`);
  }

  deletePlace(href: string): Observable<any> {
    return this.httpClient.delete<any>(href);
  }

  createPlace(username: string, workPlaceName: string, place: CreatingPlace): Observable<any> {
    return this.httpClient.post<any>(`${this.url + username}/work-place/${workPlaceName}/new-place`, place);
  }

  getNextTimetableTemplate(username: string, workPlaceName: string): Observable<TimetableTemplate> {
    return this.httpClient.get<TimetableTemplate>(`${this.url + username}/work-place/${workPlaceName}/get-next-template`);
  }

  getTimetableTemplate(username: string, workPlaceName: string, year: string, month: string): Observable<TimetableTemplate> {
    return this.httpClient.get<TimetableTemplate>(`${this.url + username}/work-place/${workPlaceName}/year/${year}/month/${month}/get-template`);
  }

  sendTimetableTemplate(username: string, workPlaceName: string, timetableTemplate: TimetableTemplate): Observable<any> {
    return this.httpClient.post<any>(`${this.url + username}/work-place/${workPlaceName}/create-timetable`, timetableTemplate);
  }

  getWorkPlaceRepresentatives(username: string, workPlaceName: string): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.url + username}/work-place/${workPlaceName}/representatives`);
  }

  inviteRepresentative(username: string, workPlaceName: string, invitingRepresentative: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url + username}/work-place/${workPlaceName}/representatives`, invitingRepresentative);
  }

  getTimetableByYear(username: string, workPlaceName: string, year: string): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>(`${this.url + username}/work-place/${workPlaceName}/year/${year}`);
  }

  getTimetableByMonth(username: string, workPlaceName: string, year: string, month: string): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>(`${this.url + username}/work-place/${workPlaceName}/year/${year}/month/${month}`);
  }

  getTimetableByDay(username: string, workPlaceName: string, year: string, month: string, day: string): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>(`${this.url + username}/work-place/${workPlaceName}/year/${year}/month/${month}/day/${day}`);
  }

  getVisitDetails(username: string, workPlaceName: string, year: string, month: string, day: string, visitId: string): Observable<Visit> {
    return this.httpClient.get<Visit>(`${this.url + username}/work-place/${workPlaceName}/year/${year}/month/${month}/day/${day}/visit/${visitId}`);
  }

  deleteVisit(href: string): Observable<any> {
    return this.httpClient.delete<any>(href);
  }
}
