//Require dependencies
require("dotenv").config();
const inquirer=require("inquirer");
const mysql= require("mysql2");
require("console.table");

const setup=process.env;
//SQL connection setup from .env file
const db=mysql.createConnection({
    host: setup.DB_HOST,
    user: setup.DB_USER,
    password: setup.DB_PASSWORD,
    database: setup.DB_DATABASE,
});

//Connect to server and launch app
db.connect((err)=>{
    if (err) throw err;
    console.log("Welcome to the Employee Tracker CMS!")
    start();
});

function start(){
    inquirer.prompt({
        type:"list",
        name:"options",
        message:"What would you like to do?",
        choices:["View All Employees", "Add Employee","Update Employee Role","View All Roles","Add Role","View All Departments","Add Department","Quit"]
    })
    .then(function({options}){
        switch(options){
            case "View All Employees":
                viewEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;
                
            case "Update Employee Role":
                updateEmployee();
                break;

            case "View All Roles":
                viewRoles();
                break;

            case "Add Role":
                addRole();
                break;

            case "View All Departments":
                viewDepartments();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Quit":
                db.end();
                break;
        }
    })
}

//View all employees function
function viewEmployees(){
    var query= 
        `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(m.first_name,' ',m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id`

    db.query(query, function(err, results){
        if(err) throw err;
        console.table(results);
        start();
    });
};