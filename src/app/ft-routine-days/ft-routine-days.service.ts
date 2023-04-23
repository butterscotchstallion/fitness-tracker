import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compact, each, isArray } from 'lodash-es';
import { Subject } from 'rxjs';
import { FtRoutineSelectorService } from '../ft-exercise-routine/ft-routine-list/ft-routine-selector.service';
import { IFtExerciseRoutine } from '../ft-exercise-routine/i-ft-exercise-routine.interface';
import { FtUrls } from '../shared/ft-urls.constant';
import { IFtDayMap } from './i-ft-day-map.interface';
import { IFtRoutineDays } from './i-ft-routine-days.interface';
import { FtHttpService } from '../shared/ft-http.service';
@Injectable({
  providedIn: 'root'
})
export class FtRoutineDaysService {
  private apiUrl = FtUrls.baseApiUrl;
  private routineId!: number;
  public isWorkoutDay = false;
  public routineDayMapLoaded$ = new Subject<IFtRoutineDays>();
  public isWorkoutDay$ = new Subject<boolean>();

  constructor(private http: FtHttpService,
              private ftRoutineSelector: FtRoutineSelectorService) {
    this.isWorkoutDay$.subscribe((isWorkoutDay: boolean) => {
      this.isWorkoutDay = isWorkoutDay;
    });
  }

  getRoutineDaysMap(routineDays: IFtRoutineDays[]) {
    const dayMap: any = {};

    if (routineDays.length === 0) {
      return false;
    }

    each(routineDays, (routineDay: any) => {
      const routineId = routineDay.routineId;
      dayMap[routineId] = [
        { name: 'Sun', isWorkoutDay: routineDay.sunday },
        { name: 'Mon', isWorkoutDay: routineDay.monday },
        { name: 'Tue', isWorkoutDay: routineDay.tuesday },
        { name: 'Wed', isWorkoutDay: routineDay.wednesday },
        { name: 'Thu', isWorkoutDay: routineDay.thursday },
        { name: 'Fri', isWorkoutDay: routineDay.friday },
        { name: 'Sat', isWorkoutDay: routineDay.saturday },
      ];
    });

    return dayMap;
  }

  getRoutineDays() {
    const url = `${this.apiUrl}/routine-days`;
    return this.http.get(url, {
      observe: 'response'
    });
  }

  saveRoutineDays(routineDays: IFtRoutineDays) {
    const done$ = new Subject<IFtRoutineDays>();
    const url = `${this.apiUrl}/routine-days/new`;
    this.http.post(url, routineDays).subscribe((response: any) => {
      if (response.status === 'OK') {
        done$.next(response);
      }
    }, (error: any) => {
      done$.error(error);
    });
    return done$;
  }
}
