import { OnInit } from "@angular/core";
import * as moment from "angular2-moment/node_modules/moment";
import { IFtExercise } from "../ft-exercise-component/i-ft-exercise.interface";
import { IFtWorkoutSession } from "./i-ft-workout-session.interface";

export class FtWorkoutSession implements OnInit {
    workoutId: number|undefined;
    createdAt: string|undefined;
    updatedAt: string|undefined;
    completedAt: string|undefined;
    routineName: string|undefined;
    durationInSeconds: string|undefined;
    setsCompleted = 0;
    exercises: IFtExercise[] = [];

    ngOnInit() {
        this.createdAt = moment().toISOString();
    }
}