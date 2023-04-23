import { Component, Input, OnInit } from '@angular/core';
import { find } from 'lodash-es';
import { FtProgramService } from 'src/app/ft-program/ft-program.service';
import { IFtProgram } from 'src/app/ft-program/i-ft-program.interface';
import { FtExerciseRoutineService } from '../ft-exercise-routine.service';
import { IFtExerciseRoutine } from '../i-ft-exercise-routine.interface';
import { FtRoutineSelectorService } from './ft-routine-selector.service';

@Component({
  selector: 'ft-routine-selector',
  templateUrl: './ft-routine-selector.component.html',
  styleUrls: ['./ft-routine-selector.component.scss']
})
export class FtRoutineSelectorComponent implements OnInit {
  routines: IFtExerciseRoutine[] = [];
  @Input()
  programId!: number | undefined;
  loading: boolean = false;

  constructor(private ftExerciseRoutineService: FtExerciseRoutineService,
    private ftProgramService: FtProgramService,
    private ftRoutineSelectorService: FtRoutineSelectorService) {

  }
  
  ngOnInit(): void {
    this.ftProgramService.selectedProgram$.subscribe((program: IFtProgram) => {
      this.loading = true;
      this.ftExerciseRoutineService.getRoutines(program.programId).subscribe((res: any) => {
        this.routines = res.body || [];
        this.loading = false;
        if (this.routines.length > 0) {
          this.ftRoutineSelectorService.setSelectedRoutine(this.routines[0]);
        } else {
          console.warn("No routines...!");
        }
      }, (error) => {
        this.loading = false;
      });
    });
  }

  onRoutineChanged(event: any) {
    const routineId = event.currentTarget.value;
    const routine = find(this.routines, (r) => {
      return r.routineId == routineId;
    });
    if (routine) {
      this.ftRoutineSelectorService.setSelectedRoutine(routine);
    } else {
      throw new Error('Could not find routine with id '+routineId);
    }
  }
}
