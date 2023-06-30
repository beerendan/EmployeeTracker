USE employees_db;

INSERT INTO department (id, department_name)
VALUES (001, "Engineering"),
        (002, "Finance"),
        (003, "Legal"),
        (004, "Sales");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, "Sales Lead", 100000, 4),
        (002, "Salesperson", 80000, 4),
        (003, "Lead Engineer", 150000, 1),
        (004, "Software Engineer", 120000, 1),
        (005, "Account Manager", 160000, 2),
        (006, "Accountant", 125000, 2),
        (007, "Legal Team Lead", 250000, 3),
        (008, "Lawyer", 190000, 3);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES  (001, "John", "Doe", 1, null),
        (002, "Mike", "Chan", 2, 1),
        (003, "Ashley", "Rodriguez", 3, null),
        (004, "Kevin", "Tupik", 4, 3),
        (005, "Kunal", "Singh", 5, null),
        (006, "Malia", "Brown", 6, 5),
        (007, "Sarah" ,"Lourd" ,7 ,null),
        (008, "Tom", "Allen" ,8 , 7);