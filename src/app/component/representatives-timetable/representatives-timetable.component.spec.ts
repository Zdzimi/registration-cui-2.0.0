import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativesTimetableComponent } from './representatives-timetable.component';

describe('RepresentativesTimetableComponent', () => {
  let component: RepresentativesTimetableComponent;
  let fixture: ComponentFixture<RepresentativesTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentativesTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativesTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
