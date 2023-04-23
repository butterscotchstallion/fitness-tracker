CREATE TABLE ft_exercise_weights(id INTEGER PRIMARY KEY,
                                 exercise_id INTEGER,
                                 weight INTEGER DEFAULT 0,
                                 updated_at TEXT,
                                 FOREIGN KEY(exercise_id) REFERENCES exercises(id));

-- Back Squat
INSERT INTO ft_exercise_weights(exercise_id, weight) VALUES(5, 135);
-- Row
INSERT INTO ft_exercise_weights(exercise_id, weight) VALUES(8, 145);
-- Bench
INSERT INTO ft_exercise_weights(exercise_id, weight) VALUES(1, 140);
-- OHP
INSERT INTO ft_exercise_weights(exercise_id, weight) VALUES(4, 35);
-- deadlift
INSERT INTO ft_exercise_weights(exercise_id, weight) VALUES(6, 215);
