import { Component, OnInit, Input } from '@angular/core';
import { IFtExercise } from './i-ft-exercise.interface';

@Component({
  selector: 'ft-exercise',
  templateUrl: './ft-exercise-component.html',
  styleUrls: ['./ft-exercise-component.css']
})
export class FtExerciseComponent implements OnInit {
  loading = true;
  @Input() exercise: IFtExercise|undefined;

  constructor() { }

  ngOnInit(): void {
    this.loading = false;
  }

}
