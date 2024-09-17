CREATE TABLE gamestationdb.users (
	users_id INT auto_increment NOT NULL,
	username varchar(200) NOT NULL,
	password varchar(300) NOT NULL,
    email varchar(200) NOT NULL,
	CONSTRAINT users_PK PRIMARY KEY (users_id)
)