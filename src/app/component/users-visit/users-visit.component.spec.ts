import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersVisitComponent } from './users-visit.component';

describe('UsersVisitComponent', () => {
  let component: UsersVisitComponent;
  let fixture: ComponentFixture<UsersVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
