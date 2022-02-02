CREATE DATABASE perntodo;



CREATE TABLE username(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL
);

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);


CREATE TABLE users_todos(
	
	users_todos_id BIGSERIAL PRIMARY KEY,
	user_id int,
	todo_id int,
	FOREIGN KEY (user_id) references username(user_id),
	FOREIGN KEY (todo_id) references todo(todo_id)

);









-- CREATE TABLE users(
--     user_id SERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(255) NOT NULL
-- );


-- CREATE TABLE users_todos(
	
-- 	users_todos_id BIGSERIAL PRIMARY KEY,
-- 	user_id int,
-- 	todo_id int,
-- 	FOREIGN KEY (user_id) references users(user_id),
-- 	FOREIGN KEY (todo_id) references todo(todo_id)

-- );
