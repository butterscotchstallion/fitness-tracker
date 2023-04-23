import { TestBed } from '@angular/core/testing';

import { FtRoutineSelectorService } from './ft-routine-selector.service';

describe('FtRoutineListService', () => {
  let service: FtRoutineSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtRoutineSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
