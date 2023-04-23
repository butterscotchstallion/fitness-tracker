import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FtExerciseRoutineService } from './ft-exercise-routine.service';

describe('FtExerciseRoutineService', () => {
  let service: FtExerciseRoutineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FtExerciseRoutineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
