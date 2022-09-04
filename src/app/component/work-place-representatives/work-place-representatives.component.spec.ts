import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlaceRepresentativesComponent } from './work-place-representatives.component';

describe('WorkPlaceRepresentativesComponent', () => {
  let component: WorkPlaceRepresentativesComponent;
  let fixture: ComponentFixture<WorkPlaceRepresentativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPlaceRepresentativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlaceRepresentativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
