
CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30),
  email varchar(30),
  password varchar(200),
  follow_count int DEFAULT 0,
  followed_count int DEFAULT 0
);


-- INSERT INTO user (id, name, email, password) VALUES (1, 'Lorem Ispum', 'lorem@mailinator.com' ,'12345');
-- INSERT INTO user (id, name, email, password) VALUES (2, 'Lorem Nospum', 'nospum@mailinator.com' ,'12345');

