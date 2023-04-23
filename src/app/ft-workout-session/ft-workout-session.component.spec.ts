import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtWorkoutSessionListComponent } from './ft-workout-session-list.component';

describe('FtWorkoutSessionComponent', () => {
  let component: FtWorkoutSessionListComponent;
  let fixture: ComponentFixture<FtWorkoutSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FtWorkoutSessionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtWorkoutSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
