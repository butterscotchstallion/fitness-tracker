import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FtWorkoutSessionService } from './ft-workout-session.service';

describe('FtWorkoutSessionService', () => {
  let service: FtWorkoutSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(FtWorkoutSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
