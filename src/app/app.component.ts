import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { IFtExercise } from './ft-exercise-component/i-ft-exercise.interface';
import { IFtExerciseRoutine } from './ft-exercise-routine/i-ft-exercise-routine.interface';
import { DAYS } from './ft-exercise-routine/days.enum';
import { IFtProgram } from './ft-program/i-ft-program.interface';
import * as moment from 'angular2-moment/node_modules/moment';
import { FtRoutineDaysService } from './ft-routine-days/ft-routine-days.service';
import { find } from 'lodash-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Fitness Tracker";
  selectedProgram!: IFtProgram;
  dateSubheader = '';
  errata: any = {
    routineDays: {
      saveError: false,
      saveOK: false
    }
  }

  constructor(private ftRoutineDaysService: FtRoutineDaysService,
              private renderer: Renderer2) {

  }

  ngOnInit() {
    const currentTimestamp = moment();
    const todayDayName = currentTimestamp.format('ddd');
    this.ftRoutineDaysService.routineDayMapLoaded$.subscribe((dayMap: any) => {
      const day = find(dayMap, (day: any) => {
        return day.name === todayDayName;
      });

      if (day.isWorkoutDay) {
        this.ftRoutineDaysService.isWorkoutDay$.next(true);
        console.log('Today is a workout day!');
        this.renderer.addClass(document.body, 'isWorkoutDay');
      } else {
        this.renderer.addClass(document.body, 'isRestDay');
      }
    });
  }

  setSelectedProgram(program: IFtProgram) {
    this.selectedProgram = program;
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'modal-open');
  }
}
