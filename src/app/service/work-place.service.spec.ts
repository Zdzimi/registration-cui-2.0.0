import { TestBed } from '@angular/core/testing';

import { WorkPlaceService } from './work-place.service';

describe('WorkPlaceService', () => {
  let service: WorkPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
