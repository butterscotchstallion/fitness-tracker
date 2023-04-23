import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FtProgramService } from './ft-program.service';
import { IFtProgram } from './i-ft-program.interface';
import * as moment from 'moment';
import { find } from 'lodash-es';

@Component({
  selector: 'ft-program-selector',
  templateUrl: './ft-program.component.html',
  styleUrls: ['./ft-program.component.scss']
})
export class FtProgramComponent implements OnInit {
  programs: IFtProgram[] = [];
  @Output('programSelectedEvent') 
  programSelected = new EventEmitter<IFtProgram>(); 

  constructor(private ftProgramService: FtProgramService) { 

  }

  ngOnInit(): void {
    this.getPrograms();
  }

  onProgramChanged(event: any) {
    const programId = event.currentTarget.value;
    const program = this.getProgramById(programId);
    if (program) {
      this.updateSelectedProgram(program);
    } else {
      throw new Error('Could not find program with id: '+programId+'. There are '+this.programs.length+' programs loaded');
    }
  }

  updateSelectedProgram(program: IFtProgram) {
    this.ftProgramService.setSelectedProgram(program);
    this.programSelected.emit(program);
  }

  getProgramById(programId: number): IFtProgram | undefined {
    return find(this.programs, (p: IFtProgram) => {
      return p.programId == programId;
    });
  }

  getPrograms() {
    this.ftProgramService.getPrograms().subscribe((result: any) => {
      this.programs = result.body;
      const selectedProgram: IFtProgram = this.programs[0];

      this.updateSelectedProgram(selectedProgram);

      this.programs.map((p: any) => {
        p.createdAt = moment(p.createdAt).format('ddd MMM DD hh:mmA');
        return p;
      });
    });
  }
}
