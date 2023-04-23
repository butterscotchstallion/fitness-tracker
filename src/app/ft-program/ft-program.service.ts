import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FtUrls } from '../shared/ft-urls.constant';
import { IFtProgram } from './i-ft-program.interface';

@Injectable({
  providedIn: 'root'
})
export class FtProgramService {
  private apiUrl = FtUrls.baseApiUrl;
  private selectedProgram: IFtProgram | undefined;
  public selectedProgram$ = new Subject<IFtProgram>();

  constructor(private http: HttpClient) {

  }

  setSelectedProgram(program: IFtProgram) {
    this.selectedProgram = program;
    this.selectedProgram$.next(program);
  }

  getSelectedProgram() {
    return this.selectedProgram;
  }

  getPrograms(programId?: number) {
    let url = `${this.apiUrl}/programs`;
    if (programId) {
        url += '?programId='+programId;
    }
    return this.http.get(url, {
        observe: 'response'
    });
  }
}
