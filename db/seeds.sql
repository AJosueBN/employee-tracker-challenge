INSERT INTO department (id , name) 
VALUES 
(1,'Sales'),
 (2, 'Engineering'),
(3,'Finance'),
 (4,'Legal');

 INSERT INTO role (id, title, salary, department_id)
 VALUES
 (1, "Lead Sales", 60000, 1),
 (2, "Web Developer", 70000, 2 ),
 (3, "Accounting", 80000, 3),
 (4, "Lawyer", 100000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES
 (1, 'Ben', 'Palmer', 1, NULL),
 (2, 'Grant', 'Taylor', 1, 1),
 (3, 'Bruce', 'Payne', 1, 1),
 (4, 'Paul', 'Mason', 2, NULL),
 (5, 'Harry', 'Conley', 3, NULL),
 (6, 'Terrell', 'James', 3, 5),
 (7, 'Rachel', 'Hawkins', 4, NULL),
 (8, 'Jess', 'Robinson', 4, 7);