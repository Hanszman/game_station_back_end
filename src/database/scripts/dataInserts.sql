-- User:
INSERT INTO gamestationdb.user (username, password, email, name, lastname) VALUES ('gamestation', '$2a$10$N5G5oydeEbnae8ZjIp1.XuuY7heV3DgBDHBcl0iTOlAK7TbbCE6fm', 'gamestation@gamestation.com', 'Game', 'Station');
INSERT INTO gamestationdb.user (username, password, email, name, lastname) VALUES ('test', '$2a$10$TV1g9bzBP.drjH5SNVSZPeFpbVkKd1.MexFR0LP2ojJ0BfDx6zq8y', 'test@testing.com', 'test', NULL);
INSERT INTO gamestationdb.user (username, password, email, name, lastname) VALUES ('hanszman', '$2a$10$Lu7IW5ZLQzjgPadjKF0dse/vxCRj1QKncZItcdYk.0hOHOLGpJveu', 'victor.hanszman@hotmail.com', 'Victor', 'Hanszman');
INSERT INTO gamestationdb.user (username, password, email, name, lastname) VALUES ('rafa', '$2a$10$HhNWyvQ9vWCm6CyDH5EVO.SEP4mOfOlE1uDGiZD6IjbvlbrGHB3Si', 'rafa@gmail.com', 'Rafaela', 'Hanszman');

-- Game:
INSERT INTO gamestationdb.game (name, genre) VALUES ('TicTacToe', 'Strategy');
INSERT INTO gamestationdb.game (name, genre) VALUES ('RockPaperScissors', 'Strategy');
INSERT INTO gamestationdb.game (name, genre) VALUES ('EndlessRunner', 'Arcade');
