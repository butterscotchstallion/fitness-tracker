import { IFtExercise } from "../ft-exercise-component/i-ft-exercise.interface";

export interface IFtWorkoutSession {
    workoutId: number,
    routineId: number,
    createdAt: string,
    updatedAt: string,
    completedAt: string,
    setsCompleted: number,
    routineName?: string,
    exercises: IFtExercise[],
    durationInSeconds: string
};
