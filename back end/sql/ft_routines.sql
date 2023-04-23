CREATE TABLE IF NOT EXISTS ft_routines(
	id INTEGER PRIMARY KEY, 
	name TEXT,
	program_id INTEGER,
	FOREIGN KEY(program_id) REFERENCES ft_programs(id)
);
INSERT INTO ft_routines(name, program_id) VALUES('Upper', 2);
INSERT INTO ft_routines(name, program_id) VALUES('Lower', 2);
INSERT INTO ft_routines(name, program_id) VALUES('A', 1);
INSERT INTO ft_routines(name, program_id) VALUES('B', 1);