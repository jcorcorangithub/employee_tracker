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
                'view an employee',
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
        
                case 'view an employee':
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

//   const getAllRoleid = ()=>{
//       //connection to role table and grab all ids and store it into an array and return it out
//       //this needs to be a key value pair (1 = HR )
//       //return arrayId;
//   }

const addDepartment = () => {
    inquirer
    .prompt(
        {
            name: 'name',
            type: 'input',
            message: "enter the name of the department",
        },
    )
    .then(function(answer){
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
    inquirer
    .prompt([
        {
            name: 'role',
            type: 'input',
            message: 'enter the title of the new role you would like to have',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'enter the salary of this new role',
        },
    ])
    .then(function(answer){
        connection.query(
            'insert into role (title, salary) values (?,?)',
            [answer.role, answer.salary],
            (err, res) => {
                if (err) throw err;
                console.log('the new role was created successfully!');
                promptUser();
            })
    });
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
            message: 'enter the first name of the new employee',
        },
        {
            name: 'employeelastname',
            type: 'input',
            message: 'enter the last name of the new employee',
        },
    ])
    .then(function(answer){
        connection.query(
            'insert into roles (first_name, last_name) values (?,?)',
            [answer.employeefirstname, answer.employeelastname ],
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

const employeeArray = [connection.query()];
const updateEmployeeRole = () => {
    
    inquirer
    .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Which employee would you like to uodate?',
        choices: [
            employeeArray
        ]
    })
    .then(function(answer){
        
    });
};