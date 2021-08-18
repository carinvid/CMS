-- for option 1
INSERT INTO department (name)
VALUES
('IT'),
('Sales'),
('Operations'),
('HR'),
('Executive');

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES 
("Manager", 40000, 5),
("Sales Lead", 35000, 2),
("HR Associate", 40000, 4),
("Software Engineer", 80000, 1),
("Secretary", 30000, 3),
("Tech-Support", 60000, 1),
("Sales Representative", 45000, 2),
("Customer Service", 28000, 3);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Timothy", "Watson", 1),
("Pamela", "Anderson", 2),
("Chris", "Thomas", 3),
("Selena", "Jones", 4),
("David", "Dunkan", 5);


INSERT INTO employee (first_name, last_name, role_id, supervisor_id)
VALUES 
("John", "Smith", 3, 4),
("Mary", "Jones", 5, 3),
("Paul", "Dull", 1, 2),
("Robert", "Trump", 4, 2),
("Rosa", "Troll", 7, 3),
("Julie", "Bronson", 2, 2),
("Tiffany", "Pink", 7, 3),
("Luke", "Brown", 8, 3),
("Lupe", "Vargas", 8, 3);

SELECT * FROM employee;