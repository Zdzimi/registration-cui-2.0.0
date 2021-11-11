import { HttpInterceptorService } from './service/http-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { InstitutionsComponent } from './component/institutions/institutions.component';
import { UsersVisitsComponent } from './component/users-visits/users-visits.component';
import { WorkPlaceComponent } from './component/work-place/work-place.component';
import { WorkPlaceCreatorComponent } from './component/work-place-creator/work-place-creator.component';
import { UserUpdateComponent } from './component/user-update/user-update.component';
import { NavBarWorkPlaceComponent } from './component/nav-bar-work-place/nav-bar-work-place.component';
import { PlacesComponent } from './component/places/places.component';
import { TimetableComponent } from './component/timetable/timetable.component';
import { TimetableTemplateComponent } from './component/timetable-template/timetable-template.component';
import { WorkPlaceRepresentativesComponent } from './component/work-place-representatives/work-place-representatives.component';
import { RepresentativesTimetableComponent } from './component/representatives-timetable/representatives-timetable.component';
import { InstitutionComponent } from './component/institution/institution.component';
import { RepresentativesComponent } from './component/representatives/representatives.component';
import { RepresentativeComponent } from './component/representative/representative.component';
import { BookVisitComponent } from './component/book-visit/book-visit.component';
import { UsersVisitComponent } from './component/users-visit/users-visit.component';
import { VisitDetailsComponent } from './component/visit-details/visit-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    NavBarComponent,
    TopBarComponent,
    InstitutionsComponent,
    UsersVisitsComponent,
    WorkPlaceComponent,
    WorkPlaceCreatorComponent,
    UserUpdateComponent,
    NavBarWorkPlaceComponent,
    PlacesComponent,
    TimetableComponent,
    TimetableTemplateComponent,
    WorkPlaceRepresentativesComponent,
    RepresentativesTimetableComponent,
    InstitutionComponent,
    RepresentativesComponent,
    RepresentativeComponent,
    BookVisitComponent,
    UsersVisitComponent,
    VisitDetailsComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
