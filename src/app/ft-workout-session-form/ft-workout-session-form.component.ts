import { Component, Input, OnInit } from '@angular/core';
import { FtExerciseService } from '../ft-exercise-component/ft-exercise.service';
import { IFtExercise } from '../ft-exercise-component/i-ft-exercise.interface';
import { FtExerciseRoutineService } from '../ft-exercise-routine/ft-exercise-routine.service';
import { IFtExerciseRoutineMap } from '../ft-exercise-routine/i-ft-exercise-routine-map.interface';
import { IFtExerciseRoutine } from '../ft-exercise-routine/i-ft-exercise-routine.interface';
import { each, extend, map } from 'lodash-es';
import { FtRoutineSelectorService } from '../ft-exercise-routine/ft-routine-list/ft-routine-selector.service';
import { IFtWorkoutSession } from '../ft-workout-session/i-ft-workout-session.interface';
import { formattedError } from '@angular/compiler';
import { FtExerciseWeightsService } from '../ft-exercise-weights/ft-exercise-weights.service';
import { IFtExerciseWeight } from '../ft-exercise-weights/i-ft-exercise-weight.interface';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'angular2-moment/node_modules/moment';

@Component({
  selector: 'ft-workout-session-form',
  templateUrl: './ft-workout-session-form.component.html',
  styleUrls: ['./ft-workout-session-form.component.scss']
})
export class FtWorkoutSessionFormComponent implements OnInit {
  @Input() showForm = true;
  routines: IFtExerciseRoutine[] = [];
  exercises: IFtExercise[] = [];
  erMap: IFtExerciseRoutineMap = {};
  selectedRoutine!: IFtExerciseRoutine;
  isSessionValid = false;
  sessionStartTime = null;
  exerciseWeightMap: any = {};
  loading = true;
  session: any = {

  };
  formExercises = new FormArray([]);
  
  constructor(private ftExerciseService: FtExerciseService,
              private ftRoutineSelectorService: FtRoutineSelectorService,
              private ftExerciseWeightService: FtExerciseWeightsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ftRoutineSelectorService.selectedRoutine$.subscribe((routine: IFtExerciseRoutine) => {
      this.selectedRoutine = routine;
      this.initSession(routine.routineId);
      this.getExercises(routine.routineId);
      this.watchFormChanges();
    });
  }

  private initSession(routineId: number) {
    this.session.routineId = routineId;
    this.session.createdAt = moment().toISOString();
  }

  private watchFormChanges() {
    this.formExercises.valueChanges
    .subscribe((session: any) => {
      this.session = extend(this.session, session);
      console.info(this.session);
    });
  }

  private getExercises(routineId?: number) {
    this.ftExerciseService.getExercises(routineId).subscribe((res: any) => {
      this.createExerciseWeightMap().subscribe((weightMap: any) => {
        this.exercises = this.formatExercises(res.body, weightMap);
        this.loading = false;

        each(this.exercises, (e: IFtExercise) => {
          this.addExercise(e);
        });
        
      });
    }, (error) => {
      this.loading = false;
    });
  }

  private addExercise(e: IFtExercise): void {
    const fg = new FormGroup({
      'name': new FormControl(e.name),
      'weight': new FormControl(e.weight),
      'setsCompleted': new FormControl(0)
    });
    this.formExercises.push(fg);
  }

  private formatExercises(exercises: IFtExercise[], weightMap: any): IFtExercise[] {
    let formatted = exercises;

    map(formatted, (e: IFtExercise) => {
      e.weight = weightMap[e.exerciseId];
      return e;
    });

    return formatted;
  }

  private createExerciseWeightMap() {
    const weightMap: any = {};
    const weightMap$ = new Subject();
    this.ftExerciseWeightService.getExerciseWeights().subscribe((response: any) => {
      each(response, (w: IFtExerciseWeight) => {
        weightMap[w.exerciseId] = w.weight;
      });
      weightMap$.next(weightMap);
    });
    return weightMap$;
  }
  
  /**
   * 1. Save exercise info (each exercise)
   * 2. Save session info
   * 3. Save exercise weights
   */
  onSubmit() {

  }
}
