CREATE TABLE ft_routines_exercises(id INTEGER PRIMARY KEY,
                                                     routine_id INTEGER,
                                                     exercise_id INTEGER,
                                                     FOREIGN KEY(routine_id) REFERENCES routines(id),
                                                     FOREIGN KEY(exercise_id) REFERENCES exercises(id));

-- Upper
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(1, 1);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(1, 2);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(1, 3);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(1, 4);

-- Lower
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(2, 5);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(2, 6);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(2, 7);

-- A (Back Squat, Bench Press, Barbell Row)
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(3, 5);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(3, 1);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(3, 8);

-- B (Squat, OHP, Deadlift)
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(4, 5);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(4, 4);
INSERT INTO ft_routines_exercises(routine_id, exercise_id) VALUES(4, 6);