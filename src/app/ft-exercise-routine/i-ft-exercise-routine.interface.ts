import { IFtExercise } from '../ft-exercise-component/i-ft-exercise.interface';
import { DAYS } from './days.enum';

export interface IFtExerciseRoutine {
	routineId: number,
	name: string,
	exercises?: IFtExercise[],
	days: DAYS[]
};