CREATE DATABASE database_preguntas;

USE database_preguntas;

-- Tabla usuarios
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

-- Tabla Links
drop table encuesta;
CREATE TABLE encuesta(
    id INT(11) NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) 
);

ALTER TABLE encuesta
    ADD PRIMARY KEY (id);

ALTER TABLE encuesta
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE pregunta1(
    id_encuesta INT(11),
    respuesta VARCHAR(50) NOT NULL,
    tiempo int(10),
    CONSTRAINT fk_encuesta FOREIGN KEY (id_encuesta) REFERENCES encuesta(id) 
)


-- C:\xampp\mysql\bin