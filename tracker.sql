CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (30)
);

INSERT INTO departments (name) VALUES ("Marketing");

CREATE TABLE roles (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR (30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT 
);

INSERT INTO roles (title, salary, department_id) VALUES ("Supervisor", 60000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Intern", 0, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Programmer", 45000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Human_Resources", 50000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Development_Operations", 50000, 3);

CREATE TABLE employees (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT,
manager_id INT
);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jane", "Doe", 2, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Dunn", 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Lane", "Davis", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Melissa", "Daniels", 5, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jack", "Reagan", 3, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Rowina", "Hernandez", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Sean", "McDade", 2, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Schulz", 1, 0);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Emma", "Lewis", 4, 0);

SELECT * FROM employee_tracker_db.employees;

SELECT * FROM employee_tracker_db.roles;

SELECT * FROM employee_tracker_db.departments

