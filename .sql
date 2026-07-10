
CREATE TABLE students(
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 age INTEGER NOT NULL,
 address VARCHAR(300),
 phone VARCHAR(11),
 gender gender_value NOT NULL,
 Create_at TIMESTAMPTZ DEFAULT NOW(),
 updated_at TIMESTAMPTZ DEFAULT NOW(),
 class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL
);

ALTER TABLE students ADD COLUMN  grade INTEGER
ALTER TABLE students DROP COLUMN  grade 
ALTER TABLE students ALTER COLUMN  address type text

INSERT INTO classes(name) VALUES ('11a5')









