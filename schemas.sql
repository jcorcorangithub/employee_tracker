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
    foreign key department_id references department(id),
);

create table employee (
    id int primary key,
    first_name varchar(30),
    last_name varchar(30),
    foreign key role_id references role(id), 
    foreign key mannager_id references role(id), 
);