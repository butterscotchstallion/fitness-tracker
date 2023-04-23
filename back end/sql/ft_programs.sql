CREATE TABLE IF NOT EXISTS ft_programs(
	id INTEGER PRIMARY KEY,
	name TEXT,
	created_at TEXT
);

INSERT INTO ft_programs(name, created_at) VALUES('Stronglifts 5x5', datetime('now'));
INSERT INTO ft_programs(name, created_at) VALUES('Old Program', datetime('now'));
