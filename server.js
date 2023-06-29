//Require dependencies
const inquirer=require("inquirer");
const mysql= require("mysql2");
const setup=process.env;
require("console.table");
require("dotenv").config();

//SQL connection setup from .env file
const db=mysql.createConnection({
    host: setup.DB_HOST,
    user: setup.DB_USER,
    password: setup.DB_PASS,
    database: "employess_db"
});

//Connect to server and launch app
connection.connect((err)=>{
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
                connection.end();
                break;
        }
    })
}

//View all employees function
function viewEmployees(){
    
}