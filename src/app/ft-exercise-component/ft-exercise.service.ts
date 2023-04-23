import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IFtExercise } from './i-ft-exercise.interface';
import { FtUrls } from '../shared/ft-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class FtExerciseService {
  apiUrl = FtUrls.baseApiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { 

  }

  getExercises(routineId?: number) {
    let url = `${this.apiUrl}/exercises`;
    if (routineId) {
      url += '?routineId='+routineId;
    }
    return this.http.get(url, {
      observe: 'response'
    });
  }
}
