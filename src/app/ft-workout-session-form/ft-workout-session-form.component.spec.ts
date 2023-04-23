import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtWorkoutSessionFormComponent } from './ft-workout-session-form.component';

describe('FtWorkoutSessionFormComponent', () => {
  let component: FtWorkoutSessionFormComponent;
  let fixture: ComponentFixture<FtWorkoutSessionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FtWorkoutSessionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtWorkoutSessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
