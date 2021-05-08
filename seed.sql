use employee_trackingDB;

insert into departments (name) values
("HR"),
("Engineering");

insert into roles (title, salary, department_id) values
("Intern", 0,1),
("Software Dev", 1000000, 2);

insert employees (first_name, last_name, role_id, manager_id)
values
("John", "Doe", 1, NULL),
("Sally", "Smith", 2, Null);

