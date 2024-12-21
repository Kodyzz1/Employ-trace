INSERT INTO departments (name) VALUES
('Human Resources'),
('Engineering'),
('Sales');

INSERT INTO roles (title, salary, department_id) VALUES
('HR Manager', 60000, 1),
('Software Engineer', 90000, 2),
('Sales Executive', 70000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Davis', 3, 1);
