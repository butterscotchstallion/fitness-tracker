CREATE TABLE IF NOT EXISTS ft_workout_sessions(
	id INT PRIMARY KEY,
	routine_id INT,
	created_at TEXT,
	updated_at TEXT,
	completed_at TEXT,
	sets_completed INT,
	FOREIGN KEY(routine_id) REFERENCES routines(id)
);
