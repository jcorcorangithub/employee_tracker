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
                'view roles',
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

                case 'view roles':
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
                    promptUser();
                })
        });
};

const viewDepartments = () => {
    connection.query(`select * from departments`,
        (err, res) => {
            let depArray = [];
            for (i = 0; i < res.length; i++) {
                depArray[i] = `${res[i].name}, ${res[i].id}`;
            }
            if(depArray.length == 0) {
                console.log("\n-\n-\n-there are no departments created yet\n-\n-\n-");
                promptUser();
            }
            else {
                console.table(res);
                promptUser();
            }
        });
};

//this is creating the role but settings its department id to a different role
const addRole = () => {
    let depArray = [];
    connection.query('select * from departments', function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            depArray[i] = `${res[i].name}, ${res[i].id}`;
        }
        if (depArray.length == 0){
            console.log('\n-\n-\n-you must first create a department before creating a role\n-\n-\n-');
            promptUser();
        } else {
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
                let dep = answer.department.split(',');
                connection.query(
                    'insert into roles (title, salary, department_id) values (?,?,?)',
                    [answer.role, answer.salary, dep[1]],
                    (err, res) => {
                        if (err) throw err;
                        promptUser();
                    });
            });
    }})
};

const viewRoles = () => {
    connection.query(`select * from roles join departments on roles.department_id = departments.id`,
        (err, res) => {
            let roleArray = [];
            for (i = 0; i < res.length; i++) {
                roleArray[i] = `${res[i].name}, ${res[i].id}`;
            }
            if(roleArray.length == 0) {
                console.log("\n-\n-\n-there are no roles created yet\n-\n-\n-");
                promptUser();
            }
            else {
                console.table(res);
                promptUser();
            }
        });

};


//TODO add manager id
const addEmployee = () => { 
    let roleArray = [];
    connection.query('select * from roles', function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            roleArray[i] = `${res[i].title}, ${res[i].id}`;
            // res[i].id -1
        };
        if (roleArray.length == 0){
            console.log('\n-\n-\n-you must first create a role before creating an employee\n-\n-\n-');
            promptUser();
        } 
    
    // let managerArray = [];
    // connection.query('select * from managers', function (err, res) {
    //     if (err) throw err;
    //     for (i = 0; i < res.length; i++) {
    //         managerArray[i] = `${res[i].title}, ${res[i].id}`;
    //         // res[i].id -1
    //     }
        else {
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
                choices: [...roleArray]
            },
            // {
            //     name: 'employeemanager',
            //     type: 'list',
            //     message: 'choose who you will want to manage this employee: ',
            //     choices: [...managerArray]
            // }
        ])
        .then(function (answer) {
            let role = answer.employeerole.split(',');
            connection.query(
                'insert into employees (first_name, last_name, role_id) values (?,?,?)',
                [answer.employeefirstname, answer.employeelastname, role[1]],
                (err, res) => {
                    if (err) throw err;
                    promptUser();
                });
            // let mng = answer.employeemanager.split(',');
            // connection.query(
            //     'insert into employees (manager_id) values (?)',
            //     [mng[1]],
            //     (err, res) => {
            //         if (err) throw err;
            //         promptUser();
            // });
        });
    }});

    
};

const viewEmployees = () => {
    // join roles on employees.role_id = roles.title
    connection.query(`select * from employees join roles on employees.role_id = roles.id`,
        (err, res) => {
            let empArray = [];
            for (i = 0; i < res.length; i++) {
                empArray[i] = `${res[i].name}, ${res[i].id}`;
            }
            if(empArray.length == 0) {
                console.log("\n-\n-\n-there are no employees created yet\n-\n-\n-");
                promptUser();
            }
            else {
                console.table(res);
                promptUser();
            }
        });
};

const updateEmployeeRole = () => {
    let employeeArray = [];
    connection.query('select * from employees', function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            employeeArray[res[i].id - 1] = `${res[i].last_name}, ${res[i].first_name}, ${res[i].id}`;
        }
        if (employeeArray.length == 0){
            console.log('\n-\n-\n-you must first create an employee before updating an employee\n-\n-\n-');
            promptUser();
        } 
        else {
        let roleArray = [];
        connection.query('select * from roles', function (err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                roleArray[i] = `${res[i].title}, ${res[i].id}`;
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
    }});
};