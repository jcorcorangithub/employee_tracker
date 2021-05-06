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
    // this will probably be the function to start the prompt
  });