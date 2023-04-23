import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFtExerciseRoutine } from '../i-ft-exercise-routine.interface';

@Injectable({
  providedIn: 'root'
})
export class FtRoutineSelectorService {
  private selectedRoutine: IFtExerciseRoutine | undefined;
  public selectedRoutine$ = new Subject<IFtExerciseRoutine>();
  constructor() { }

  setSelectedRoutine(routine: IFtExerciseRoutine) {
    this.selectedRoutine = routine;
    this.selectedRoutine$.next(routine);
  }

  getSelectedRoutine() {
    return this.selectedRoutine;
  }
}
