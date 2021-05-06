const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8080,
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
                'view a department',
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
                    //function
                    break;
        
                case 'add a role':
                    //function
                    break;
        
                case 'add an employee':
                    //function
                    break;
        
                case 'view a department':
                    //function
                    break;
        
                case 'view a role':
                    //function
                    break;
        
                case 'view an employee':
                    //function
                    break;

                case 'update employee role':
                    //function
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
        
                default:
                  console.log(`Invalid action: ${answer.action}`);
                  break;
              }
        });
  };

  const addDepartment = () => {
      inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: "enter the id of the department",
            },
            {
                name: 'id',
                type: 'input',
                message: "enter the name of the department",
            },
        ])
        .then(function(answers){
            //this is where the query will be written 
            //the promptUser function will also be called again
        });
  };