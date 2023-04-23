import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtExerciseComponent } from './ft-exercise-component';

describe('FtExerciseComponent', () => {
  let component: FtExerciseComponent;
  let fixture: ComponentFixture<FtExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FtExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
