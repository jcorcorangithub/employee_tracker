drop databse if exists employee_trackingDB;
create database employee_trackingDB;

use employee_trackingDB;

create table department (
    id int, 
    name varchar(30),
);

create table role (
    id int primary key,
    title varchar(30),
    salary decimal,
    department_id int 
    -- this will join department table
);

create table employee (
    id int primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int, -- this will join role table
    manager_id int 
);