USE employees_db;

INSERT INTO department (department_name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 4),
        ("Salesperson", 80000, 4),
        ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "John", "Doe", 1, null),
        (002, "Mike", "Chan", 2, 1),
        (003, "Ashley", "Rodriguez", 3, null),
        (004, "Kevin", "Tupik", 4, 3),
        (005, "Kunal", "Singh", 5, null),
        (006, "Malia", "Brown", 6, 5),
        (007, "Sarah" ,"Lourd" ,7 ,null),
        (008, "Tom", "Allen" ,8 , 7);