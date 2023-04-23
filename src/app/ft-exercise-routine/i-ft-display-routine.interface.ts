import { IFtExercise } from "../ft-exercise-component/i-ft-exercise.interface";
import { IFtExerciseRoutine } from "./i-ft-exercise-routine.interface";

export interface IFtDisplayRoutine extends IFtExerciseRoutine {
    exercises: IFtExercise[]
}