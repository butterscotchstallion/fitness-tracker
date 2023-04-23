import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, find, map, mergeMap } from 'rxjs/operators';
import { FtUrls } from '../shared/ft-urls.constant';
import { IFtExerciseWeight } from './i-ft-exercise-weight.interface';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class FtExerciseWeightsService {
  private apiUrl = FtUrls.baseApiUrl;
  constructor(private http: HttpClient) {

  }

  getExerciseWeights() {
    return this.http.get(`${this.apiUrl}/exercise-weights`);
  }

  getExerciseWeightById(exerciseWeights: any, exerciseId: number) {
    return find(exerciseWeights, (ew: IFtExerciseWeight) => {
      return ew.exerciseId === exerciseId;
    });
  }
}
