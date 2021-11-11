import { TimetableComponent } from './component/timetable/timetable.component';
import { BookVisitComponent } from './component/book-visit/book-visit.component';
import { RepresentativesComponent } from './component/representatives/representatives.component';
import { InstitutionComponent } from './component/institution/institution.component';
import { WorkPlaceRepresentativesComponent } from './component/work-place-representatives/work-place-representatives.component';
import { TimetableTemplateComponent } from './component/timetable-template/timetable-template.component';
import { PlacesComponent } from './component/places/places.component';
import { WorkPlaceComponent } from './component/work-place/work-place.component';
import { InstitutionsComponent } from './component/institutions/institutions.component';
import { WorkPlaceCreatorComponent } from './component/work-place-creator/work-place-creator.component';
import { UserUpdateComponent } from './component/user-update/user-update.component';
import { UserComponent } from './component/user/user.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersVisitsComponent } from './component/users-visits/users-visits.component';
import { RepresentativesTimetableComponent } from './component/representatives-timetable/representatives-timetable.component';
import { RepresentativeComponent } from './component/representative/representative.component';
import { UsersVisitComponent } from './component/users-visit/users-visit.component';
import { VisitDetailsComponent } from './component/visit-details/visit-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'registration/:username',
    component: UserComponent
  },
  {
    path: 'registration/:username/institutions/:searchingVariable',
    component: InstitutionsComponent
  },
  {
    path: 'registration/:username/institution/:institutionName',
    component: InstitutionComponent
  },
  {
    path: 'registration/:username/institution/:institutionName/representatives',
    component: RepresentativesComponent
  },
  {
    path: 'registration/:username/institution/:institutionName/representatives/:representativeName',
    component: RepresentativeComponent
  },
  {
    path: 'registration/:username/institution/:institutionName/representatives/:representativeName/timetable',
    component: RepresentativesTimetableComponent
  },
  {
    path: 'registration/:username/institution/:institutionName/representatives/:representativeName/timetable/:visitId',
    component: BookVisitComponent
  },
  {
    path: 'registration/:username/visits',
    component: UsersVisitsComponent
  },
  {
    path: 'registration/:username/visits/:visitId',
    component: UsersVisitComponent
  },
  {
    path: 'registration/:username/update-user',
    component: UserUpdateComponent
  },
  {
    path: 'registration/:username/new-work-place',
    component: WorkPlaceCreatorComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName',
    component: WorkPlaceComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/places',
    component: PlacesComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/representatives',
    component: WorkPlaceRepresentativesComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/get-next-template',
    component: TimetableTemplateComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/year/:year/month/:month/get-template',
    component: TimetableTemplateComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/year/:year',
    component: TimetableComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/year/:year/month/:month',
    component: TimetableComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/year/:year/month/:month/day/:day',
    component: TimetableComponent
  },
  {
    path: 'registration/:username/work-place/:workPlaceName/year/:year/month/:month/day/:day/visit/:visitId',
    component: VisitDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
