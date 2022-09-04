import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersVisitsComponent } from './users-visits.component';

describe('UsersVisitsComponent', () => {
  let component: UsersVisitsComponent;
  let fixture: ComponentFixture<UsersVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
