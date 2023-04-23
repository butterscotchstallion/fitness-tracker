import { TestBed } from '@angular/core/testing';
import { FtProgramService } from './ft-program.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FtProgramService', () => {
  let service: FtProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FtProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
