import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableTemplateComponent } from './timetable-template.component';

describe('TimetableTemplateComponent', () => {
  let component: TimetableTemplateComponent;
  let fixture: ComponentFixture<TimetableTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
