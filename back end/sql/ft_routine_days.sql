CREATE TABLE IF NOT EXISTS ft_routine_days(
	id INTEGER PRIMARY KEY,
	routine_id INTEGER,
	sunday TINYINT DEFAULT 0,
	monday TINYINT DEFAULT 0,
	tuesday TINYINT DEFAULT 0,
	wednesday TINYINT DEFAULT 0,
	thursday TINYTINT DEFAULT 0,
	friday TINYINT DEFAULT 0,
	saturday TINYINT DEFAULT 0,
	FOREIGN KEY(routine_id) REFERENCES routines(id)
);

INSERT INTO ft_routine_days(routine_id, monday, friday) VALUES(3, 1, 1);
INSERT INTO ft_routine_days(routine_id, wednesday) VALUES(4, 1);
