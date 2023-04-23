import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IFtExercise } from '../ft-exercise-component/i-ft-exercise.interface';
import { IFtExerciseRoutine } from './i-ft-exercise-routine.interface';
import { IFtExerciseRoutineMap } from './i-ft-exercise-routine-map.interface';
import { FtExerciseRoutineService } from '../ft-exercise-routine/ft-exercise-routine.service';
import { FtExerciseService } from '../ft-exercise-component/ft-exercise.service';
import { filter, has, extend, includes } from 'lodash-es';
import { IFtDisplayRoutine } from './i-ft-display-routine.interface';
import { DAYS } from './days.enum';
import { Subscription, noop } from 'rxjs';
import { isFunction } from 'lodash-es';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'ft-exercise-routine-list',
  templateUrl: './ft-exercise-routine.component.html',
  styleUrls: ['./ft-exercise-routine.component.scss']
})
export class FtExerciseRoutineListComponent implements OnInit {
  @Input() programId!: number;
  @Output() onRoutinesLoaded: EventEmitter<any> = new EventEmitter();
  routines: IFtExerciseRoutine[] = [];
  exercises: IFtExercise[] = [];
  routineMap: IFtExerciseRoutineMap = {};
  exerciseMap: any = {};
  routinesExist = false;
  displayRoutines: IFtDisplayRoutine[] = [];
  days = DAYS;
  subscriptions: Subscription[] = [];

  constructor(private ftExerciseRoutineService: FtExerciseRoutineService,
              private ftExerciseService: FtExerciseService) { }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises() {
    this.ftExerciseService.getExercises().subscribe((res: any) => {
        if (res.body) {
          this.exercises = res.body;
          for (let e of this.exercises) {
            if (!has(this.exerciseMap, e.exerciseId)) {
              this.exerciseMap[e.exerciseId] = [];
            }
            this.exerciseMap[e.exerciseId].push(e);
          }
          this.getRoutines();
        }
    }, (error: any) => {
      console.error(error);
    });
  }

  getRoutines() {
    this.ftExerciseRoutineService.getRoutines(this.programId).subscribe((res: any) => {
      if (res.body) {
        this.routines = res.body;
        this.onRoutinesLoaded.emit(this.routines);
        this.getRoutineExerciseMap(this.routines);
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  getRoutineExerciseMap(routines: any) {
    this.ftExerciseRoutineService.getRoutineExerciseMap().subscribe((res: any) => {
      if (res.body) {
        const results = res.body;
        let routineMap:IFtExerciseRoutineMap = {};

        for (let e of this.exercises) {
          this.exerciseMap[e.exerciseId] = e;
        }

        for (let row of results) {
          if (!has(routineMap, row.routineId)) {
            routineMap[row.routineId] = [];
          }
          routineMap[row.routineId].push(this.exerciseMap[row.exerciseId]);
        }

        this.displayRoutines = this.createDisplayRoutines(routineMap);
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  createDisplayRoutines(routineMap: IFtExerciseRoutineMap): IFtDisplayRoutine[] {
    let displayRoutines:IFtDisplayRoutine[] = [];
    for (let routine of this.routines) {
      const routineExercises = routineMap[routine.routineId];
      const displayRoutine = extend(routine, {
        exercises: routineExercises
      });
      displayRoutines.push(displayRoutine);
    }
    return displayRoutines;
  }

  onRoutineChanged(routine: IFtExerciseRoutine) {
    this.ftExerciseRoutineService.setSelectedRoutine(routine);
  }
}
