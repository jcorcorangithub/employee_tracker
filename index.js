const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_trackingDB',
});

connection.connect((err) => {
    if (err) throw err;
    promptUser();
});

const promptUser = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'add a department',
                'add a role',
                'add an employee',
                'view departments',
                'view a role',
                'view employees',
                'update employee role',
                // 'update employee managers',
                // 'view employees by manager',
                // 'delete a department',
                // 'delete a role',
                // 'delete an employee',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'add a department':
                    addDepartment();
                    break;

                case 'add a role':
                    addRole();
                    break;

                case 'add an employee':
                    addEmployee();
                    break;

                case 'view departments':
                    viewDepartments();
                    break;

                case 'view a role':
                    viewRoles();
                    break;

                case 'view employees':
                    viewEmployees();
                    break;

                case 'update employee role':
                    updateEmployeeRole();
                    break;

                // case 'update employee managers':
                //     //function
                //     break;

                // case 'view employees by manager':
                //     //function
                //     break;

                // case 'delete a department':
                //     //function
                //     break;

                // case 'delete a role':
                //     //function
                //     break;

                // case 'delete an employee':
                //     //function
                //     break;

                // default:
                //   console.log(`Invalid action: ${answer.action}`);
                //   break;
            }
        });
};

const addDepartment = () => {
    inquirer
        .prompt(
            {
                name: 'name',
                type: 'input',
                message: "enter the name of the department",
            },
        )
        .then(function (answer) {
            connection.query(
                'insert into departments (name) values (?)',
                answer.name,
                (err, res) => {
                    if (err) throw err;
                    console.log('Your department was created successfully!');
                    promptUser();
                })
        });
};

const viewDepartments = () => {
    connection.query(`select * from departments`,
        (err, res) => {
            console.table(res);
            promptUser();
        });
};

//TODO add department id
const addRole = () => {
    let depArray = [];
    connection.query('select * from departments', function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            depArray[res[i].id - 1] = `${res[i].name}, ${res[i].id}`;
        }
        
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'input',
                    message: 'enter the title of the new role you would like to have: ',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'enter the salary of this new role: ',
                },
                {
                    name: 'department',
                    type: 'list',
                    message: 'What department do you want this role to be assigned to? ',
                    choices: [...depArray]
                }
            ])
            .then(function (answer) {
                connection.query(
                    'insert into roles (title, salary) values (?,?)',
                    [answer.role, answer.salary],
                    (err, res) => {
                        if (err) throw err;
                    })
                let dep = answer.department.split(',');
                connection.query(
                    'insert into roles(department_id) values (?)',
                    [dep[1]],
                    (err, res) => {
                        if (err) throw err;
                        promptUser();
                });
            });
    })
};





const viewRoles = () => {
    connection.query(`select * from roles`,
        (err, res) => {
            console.table(res);
            promptUser();
        });

};

//TODO add role id and manager id
const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'employeefirstname',
                type: 'input',
                message: 'enter the first name of the new employee: ',
            },
            {
                name: 'employeelastname',
                type: 'input',
                message: 'enter the last name of the new employee: ',
            },
            {    
                name: 'employeerole',
                type: 'list',
                message: 'choose the role this employee will have: ',
                choices: []
            },
            {
                name: 'employeemanager',
                type: 'list',
                message: 'choose who you will want to manage this employee: ',
                choices: []
            }
        ])
        .then(function (answer) {
            connection.query(
                'insert into roles (first_name, last_name) values (?,?)',
                [answer.employeefirstname, answer.employeelastname],
                (err, res) => {
                    if (err) throw err;
                    console.log('the new employee was created successfully!');
                    promptUser();
                })
        });
};

const viewEmployees = () => {
    connection.query(`select * from employees`,
        (err, res) => {
            console.table(res);
            promptUser();
        });

};

const updateEmployeeRole = () => {
    let employeeArray = [];
    connection.query('select * from employees', function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            employeeArray[res[i].id - 1] = `${res[i].last_name}, ${res[i].first_name}, ${res[i].id}`;
        }

        let roleArray = [];
        connection.query('select * from roles', function (err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                roleArray[i] = `${res[i].title}, ${res[i].id}`;
                // res[i].id -1
            }
            inquirer
                .prompt([
                    {
                        name: 'employee',
                        type: 'list',
                        message: 'Which employee would you like to update? ',
                        choices: [...employeeArray]
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: 'choose the new role you would like this employee to have: ',
                        choices: [...roleArray]
                    }
                ])
                .then(function(answer){
                    let empl = answer.employee.split(',');
                    let rle = answer.role.split(',');
                    
                    connection.query('update employees set role_id = ? where id = ?',
                    [rle[1], empl[2]],
                    (err, res) => {
                        if (err) throw err;
                        promptUser();
                    });
                });
        });
    });
};