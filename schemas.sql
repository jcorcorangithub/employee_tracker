drop database if exists employee_trackingDB;
create database employee_trackingDB;

use employee_trackingDB;

create table departments (
    id int auto_increment primary key, 
    name varchar(30)
);

create table roles (
    id int auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id int,
    constraint fk_department foreign key (department_id) references department(id)
);

create table employees (
    id int auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    constraint fk_role foreign key (role_id) references role(id), 
    manager_id int,
    constraint fk_manager foreign key (manager_id) references role(id) 
)