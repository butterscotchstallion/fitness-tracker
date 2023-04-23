import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FtUrls } from '../shared/ft-urls.constant';
import { IFtWorkoutSession } from './i-ft-workout-session.interface';

@Injectable({
  providedIn: 'root'
})
export class FtWorkoutSessionService {
  constructor(private http: HttpClient) {
    
  }

  getWorkoutSessions(programId?: number) {
    let url = `${FtUrls.baseApiUrl}/workout-sessions`;
    if (programId) {
      url += "?programId="+programId;
    }
    return this.http.get(url, { observe: 'response' });
  }

  saveSession(session: IFtWorkoutSession) {
    let url = `${FtUrls.baseApiUrl}/workout-sessions/new`;
    return this.http.post(url, session, {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
