import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FtExerciseComponent } from './ft-exercise-component/ft-exercise-component';
import { FtExerciseRoutineListComponent } from './ft-exercise-routine/ft-exercise-routine-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FtExerciseRoutineService } from './ft-exercise-routine/ft-exercise-routine.service';
import { HttpClientModule } from '@angular/common/http';
import { FtExerciseService } from './ft-exercise-component/ft-exercise.service';
import { FtWorkoutSessionListComponent } from './ft-workout-session/ft-workout-session-list.component';
import { MomentModule } from 'angular2-moment';
import { FtWorkoutSessionFormComponent } from './ft-workout-session-form/ft-workout-session-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FtProgramComponent } from './ft-program/ft-program.component';
import { FtRoutineSelectorComponent } from './ft-exercise-routine/ft-routine-list/ft-routine-selector.component';
import { FtBarbellWeightComponent } from './ft-barbell-weight/ft-barbell-weight.component';
import { FtRoutineDaysComponent } from './ft-routine-days/ft-routine-days.component';
import { FtHttpService } from './shared/ft-http.service';

@NgModule({
  declarations: [
    AppComponent,
    FtExerciseComponent,
    FtExerciseRoutineListComponent,
    FtWorkoutSessionListComponent,
    FtWorkoutSessionFormComponent,
    FtProgramComponent,
    FtRoutineSelectorComponent,
    FtBarbellWeightComponent,
    FtRoutineDaysComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    MomentModule,
    ReactiveFormsModule
  ],
  providers: [
    FtExerciseService,
    FtExerciseRoutineService,
    FtHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
