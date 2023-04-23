import { Component, OnInit } from '@angular/core';
import { FtWorkoutSessionService } from './ft-workout-session.service';
import { IFtWorkoutSession  } from './i-ft-workout-session.interface';
import { extend } from 'lodash-es';
import * as moment from 'moment';
import { pipe } from 'rxjs';
import { FtProgramService } from '../ft-program/ft-program.service';
import { IFtProgram } from '../ft-program/i-ft-program.interface';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'ft-workout-session-list',
  templateUrl: './ft-workout-session.component.html',
  styleUrls: ['./ft-workout-session.component.css']
})
export class FtWorkoutSessionListComponent implements OnInit {
  sessions: IFtWorkoutSession[] = [];
  loading = false;
  constructor(private ftSessionService: FtWorkoutSessionService,
      private ftProgramService: FtProgramService) { }

  ngOnInit(): void {
    this.getSessions();
    /*
    this.ftProgramService.selectedProgram$.subscribe((program: IFtProgram) => {

    });*/
  }

  getSessions(programId?: number) {
    this.loading = true;
    this.ftSessionService.getWorkoutSessions(programId).subscribe((res: any) => {
      if (res.body) {
        this.loading = false;
        this.sessions = res.body;
        this.sessions.map((s: any) => {
          s.createdAt = moment(s.createdAt).format('ddd MMM DD hh:mmA');
          return s;
        });
      }
    }, (error) => {
      this.loading = false;
    });
  }

  saveSession() {
    
  }
}
