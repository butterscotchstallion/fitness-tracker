import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { IFtExerciseRoutine } from './i-ft-exercise-routine.interface';
import { FtUrls } from '../shared/ft-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class FtExerciseRoutineService {
  private readonly apiUrl = FtUrls.baseApiUrl;
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');
  selectedRoutine = new Subject<IFtExerciseRoutine>();

  constructor(private http: HttpClient) { 

  }

  setSelectedRoutine(routine: IFtExerciseRoutine) {
    this.selectedRoutine.next(routine);
  }

  getRoutines(programId: number) {
    if (programId) {
      let url = `${this.apiUrl}/routines?programId=`+programId;
      return this.http.get(url, { observe: 'response' });
    } else {
      throw new Error('Invalid programId argument: '+programId);
    }
  }

  getRoutineExerciseMap() {
    return this.http.get(`${this.apiUrl}/routine-exercise-map`, { observe: 'response' });
  }
}
