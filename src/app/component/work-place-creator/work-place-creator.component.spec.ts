import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlaceCreatorComponent } from './work-place-creator.component';

describe('WorkPlaceCreatorComponent', () => {
  let component: WorkPlaceCreatorComponent;
  let fixture: ComponentFixture<WorkPlaceCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPlaceCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlaceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
