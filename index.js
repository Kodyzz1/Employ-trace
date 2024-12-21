import inquirer from 'inquirer';
import consoleTable from 'console.table';
import pool from './connection.js';

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View all departments':
      viewAllDepartments();
      break;
    case 'View all roles':
      viewAllRoles();
      break;
    case 'View all employees':
      viewAllEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    default:
      pool.end();
  }
};

const viewAllDepartments = async () => {
  try {
    const res = await pool.query('SELECT * FROM departments');
    console.table(res.rows);
    mainMenu();
  } catch (err) {
    console.error(err);
  }
};

const viewAllRoles = async () => {
  try {
    const res = await pool.query(`
    SELECT roles.id, roles.title, roles.salary, departments.name AS department 
    FROM roles 
    JOIN departments ON roles.department_id = departments.id
    `);
    console.table(res.rows);
    mainMenu();
  } catch (err) {
    console.error(err);
  }
};

const viewAllEmployees = async () => {
  try {
    const res = await pool.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, 
    (SELECT CONCAT(manager.first_name, ' ', manager.last_name) FROM employees manager WHERE manager.id = employees.manager_id) AS manager
    FROM employees 
    JOIN roles ON employees.role_id = roles.id 
    JOIN departments ON roles.department_id = departments.id
    `);
    console.table(res.rows);
    mainMenu();
  } catch (err) {
    console.error(err);
  }
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    { name: 'name', message: 'Enter the department name:' }
  ]);
  try {
    await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
    console.log(`Department ${name} added successfully.`);
    mainMenu();
  } catch (err) {
    console.error(err);
  }
};

const addRole = async () => {
  const { title, salary, department_id } = await inquirer.prompt([
    { name: 'title', message: 'Enter the role title:' },
    { name: 'salary', message: 'Enter the salary for the role:' },
    { name: 'department_id', message: 'Enter the department ID:' }
  ]);
  try {
    await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Role ${title} added successfully.`);
    mainMenu();
  } catch (err) {
    console.error(err);
  }
};

const addEmployee = async () => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    { name: 'first_name', message: 'Enter the employee\'s first name:' },
    { name: 'last_name', message: 'Enter the employee\'s last name:' },
    { name: 'role_id', message: 'Enter the role ID:' },
    { name: 'manager_id', message: 'Enter the manager ID (if any):' }
  ]);
  try {
    await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log(`Employee ${first_name} ${last_name} added successfully.`);
    mainMenu();
  } catch (err) {
    console.error(err);
  }
};

const updateEmployeeRole = async () => {
  const { employee_id, role_id } = await inquirer.prompt([
    { name: 'employee_id', message: 'Enter the employee ID:' },
    { name: 'role_id', message: 'Enter the new role ID:' }
  ]);
  try {
    await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log(`Employee's role updated successfully.`);
    mainMenu();
  } catch (err) {
    console.error(err);
  }
};

mainMenu();
