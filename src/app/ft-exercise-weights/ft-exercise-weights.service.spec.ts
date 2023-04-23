import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FtExerciseWeightsService } from './ft-exercise-weights.service';

describe('FtExerciseWeightsService', () => {
  let service: FtExerciseWeightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FtExerciseWeightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
