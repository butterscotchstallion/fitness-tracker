import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FtExerciseComponent } from './ft-exercise-component';
@NgModule({
  imports:      [ BrowserModule, FtExerciseComponent ],
  providers:    [  ],
  declarations: [ FtExerciseComponent ],
  exports:      [ FtExerciseComponent ],
  bootstrap:    [ FtExerciseComponent ]
})
export class FtExerciseComponentModule { }