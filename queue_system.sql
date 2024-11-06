CREATE DATABASE IF NOT EXISTS queue_system;
USE queue_system;

DROP TABLE IF EXISTS queue_status;
CREATE TABLE queue_status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    current_number INT NOT NULL DEFAULT 0,
    queue_length INT NOT NULL DEFAULT 0
);

INSERT INTO queue_status (id, current_number, queue_length) VALUES (1, 0, 0);
