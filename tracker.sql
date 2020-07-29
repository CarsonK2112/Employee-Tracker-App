CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
id INT PRIMARY KEY,
name VARCHAR (30)
);

CREATE TABLE roles (
id INT PRIMARY KEY,
title VARCHAR (30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT 
);

CREATE TABLE employees (
id INT PRIMARY KEY,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT,
manager_id INT
);
