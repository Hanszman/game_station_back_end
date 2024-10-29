CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `genre` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `user_game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `wins` int DEFAULT NULL,
  `losses` int DEFAULT NULL,
  `draws` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_game_FK_user` (`user_id`),
  KEY `user_game_FK_game` (`game_id`),
  CONSTRAINT `user_game_FK_game` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `user_game_FK_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
)

ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;