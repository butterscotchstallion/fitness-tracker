import { Component, OnInit } from '@angular/core';
import { FtRoutineSelectorService } from '../ft-exercise-routine/ft-routine-list/ft-routine-selector.service';
import { IFtExerciseRoutine } from '../ft-exercise-routine/i-ft-exercise-routine.interface';
import { FtDays } from './ft-days.enum';
import { FtRoutineDaysService } from './ft-routine-days.service';
import { IFtRoutineDays } from './i-ft-routine-days.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinct, distinctUntilChanged, filter } from 'rxjs/operators';
import { clone, each, extend, find, flatMap, values } from 'lodash-es';
import { FtBarbellWeightComponent } from '../ft-barbell-weight/ft-barbell-weight.component';
import { requireCheckboxesToBeCheckedValidator } from './ft-routine-days-validator';
import * as moment from 'angular2-moment/node_modules/moment';

@Component({
  selector: 'ft-routine-days',
  templateUrl: './ft-routine-days.component.html',
  styleUrls: ['./ft-routine-days.component.scss']
})
export class FtRoutineDaysComponent implements OnInit {
  routineDaysForm = this.fb.group({
    routineDays: new FormArray([])          
  });
  submitted = false;
  selectedRoutine!: IFtExerciseRoutine;
  routineDays: any = [];
  daysOfWeek: any = [];
  loading = true;
  todayDayName = "";

  constructor(private ftRoutineSelector: FtRoutineSelectorService,
              private ftRoutineDaysService: FtRoutineDaysService,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.todayDayName = moment().format('ddd');

    this.ftRoutineSelector.selectedRoutine$.subscribe((routine: IFtExerciseRoutine) => {
      this.selectedRoutine = routine;
      
      this.getRoutineDays();
      this.setUpRoutineDaysWatch();
    });
  }

  getRoutineDays() {
    this.ftRoutineDaysService.getRoutineDays().subscribe((routineDays: any) => {
      this.loading = false;
      const dayMap = this.ftRoutineDaysService.getRoutineDaysMap(routineDays);
      if (dayMap) {
        this.routineDays = dayMap[this.selectedRoutine.routineId];
        const dayDict = this.getDayDict(routineDays);
        this.routineDaysForm = this.fb.group({
          'Sun': new FormControl(dayDict['Sun']),
          'Mon': new FormControl(dayDict['Mon']),
          'Tue': new FormControl(dayDict['Tue']),
          'Wed': new FormControl(dayDict['Wed']),
          'Thu': new FormControl(dayDict['Thu']),
          'Fri': new FormControl(dayDict['Fri']),
          'Sat': new FormControl(dayDict['Sat'])
        }, {
          Validators: [requireCheckboxesToBeCheckedValidator()]
        });
        this.watchFormChanges();
        this.ftRoutineDaysService.routineDayMapLoaded$.next(this.routineDays);
      } else {
        console.error('Error building routine day map!');
      }
    }, (error: any) => {
      this.loading = false;
    });
  }

  getDayDict(routineDays: IFtRoutineDays): any {
    let dict: any = {};
    each(this.routineDays, (rd: any) => {
      dict[rd.name] = rd.isWorkoutDay;
    });
    return dict;
  }

  watchFormChanges() {
    this.routineDaysForm.valueChanges
    .subscribe((routineDays: any) => {
      /**
       * Keeps colors in sync when routine days are changed
       */
      let idx = 0;
      each(this.routineDays, (rd: any) => {
        this.routineDays[idx].isWorkoutDay = routineDays[rd.name] ? 1 : 0;
        idx++;
      });
    });
  }

  isToday(dayName: string) {
    return dayName === this.todayDayName;
  }

  setUpRoutineDaysWatch() {
    this.routineDaysForm.setErrors({required: true});
    this.routineDaysForm.valueChanges.subscribe((newValues: any) => {
      const checked = find(newValues, (day: any) => {
        return day;
      });
      if (checked) {
        this.routineDaysForm.setErrors(null);
      } else {
        this.routineDaysForm.setErrors({required: true});
      }
    });
  }

  getFlatDaysFromRoutineDays(routineDays: IFtRoutineDays) {
    const days: any = clone(routineDays);
    const flatDays: any = [];
    for (let day of days) {
      flatDays.push({
        name: day,
        selected: days[day]
      });
    }
    return flatDays;
  }

  onSubmit() {
    this.saveRoutineDays();
  }

  saveRoutineDays() {
    const routineId = this.selectedRoutine.routineId;
    const dayDict = this.getDayDict(this.routineDays);
    const payload = extend(dayDict, {
      routineId: routineId
    });
    console.log(payload);
    this.ftRoutineDaysService.saveRoutineDays(payload).subscribe((response: any) => {
      console.log(response);
      this.getRoutineDays();
    }, (error) => {
      console.error(error);
    });
  }
}
