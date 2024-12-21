-- drop database if employeetracker_db exists --
DROP DATABASE IF EXISTS employeetracker_db;
-- create database employeetracker_db --
CREATE DATABASE employeetracker_db;

-- makes all following code affect the employeetracker_db database --
\c employeetracker_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT REFERENCES departments(id)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INT REFERENCES roles(id),
  manager_id INT REFERENCES employees(id)
);

CREATE TABLE manager (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    manager_id INTEGER
);
