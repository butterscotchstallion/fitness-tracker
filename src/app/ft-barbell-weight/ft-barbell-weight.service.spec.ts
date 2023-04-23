import { TestBed } from '@angular/core/testing';

import { FtBarbellWeightService } from './ft-barbell-weight.service';

describe('FtBarbellWeightService', () => {
  let service: FtBarbellWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtBarbellWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
