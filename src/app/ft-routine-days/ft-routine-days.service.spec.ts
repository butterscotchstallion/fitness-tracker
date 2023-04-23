import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FtRoutineDaysService } from './ft-routine-days.service';
import { FtHttpService } from '../shared/ft-http.service';

describe('FtRoutineDaysService', () => {
  let service: FtRoutineDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FtRoutineDaysService, FtHttpService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(FtRoutineDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
