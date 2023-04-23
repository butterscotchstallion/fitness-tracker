import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FtHttpService } from '../shared/ft-http.service';

import { FtRoutineDaysComponent } from './ft-routine-days.component';
import { FtRoutineDaysService } from './ft-routine-days.service';

describe('FtRoutineDaysComponent', () => {
  let component: FtRoutineDaysComponent;
  let fixture: ComponentFixture<FtRoutineDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FtRoutineDaysComponent ],
      providers: [ FtRoutineDaysService, FtHttpService, HttpClient, HttpHandler, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtRoutineDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
