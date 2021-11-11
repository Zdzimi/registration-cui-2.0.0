import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarWorkPlaceComponent } from './nav-bar-work-place.component';

describe('NavBarWorkPlaceComponent', () => {
  let component: NavBarWorkPlaceComponent;
  let fixture: ComponentFixture<NavBarWorkPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarWorkPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarWorkPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
