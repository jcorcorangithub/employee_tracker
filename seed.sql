use employee_trackingDB;

insert into department (name) values
("HR"),
("Engineering");

insert into role (title, salary, department_id) values
("Intern", 0,1),
("Software Dev", 1000000, 2);

insert employee (first_name, last_name, role_id, manager_id)
values
("John", "Doe", 1, NULL),
("Sally", "Smith", 2, Null);

