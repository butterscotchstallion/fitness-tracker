import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtExerciseRoutineListComponent } from './ft-exercise-routine-list.component';

describe('FtExerciseRoutineComponent', () => {
  let component: FtExerciseRoutineListComponent;
  let fixture: ComponentFixture<FtExerciseRoutineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FtExerciseRoutineListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtExerciseRoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
