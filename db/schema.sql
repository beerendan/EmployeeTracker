DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE employee(
    first_name ,
    last_name ,
    role_id ,
    manager_id ,
    id ,
    PRIMARY KEY (id)
);