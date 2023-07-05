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
        choices:["View All Employees", "Add Employee","Update Employee Role","View All Roles","Add Role","View All Departments","Add Department","Delete An Entry","Quit"]
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
                newRole();
                break;

            case "View All Departments":
                viewDepartments();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Delete An Entry":
                deleteX();
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
    LEFT JOIN roles r
    ON e.roles_id = r.id
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

//Add a new employee function
function addEmployee (){
    const query=`SELECT CONCAT(e.first_name, ' ', e.last_name) AS full_name, r.title
    FROM employee AS e
    JOIN roles AS r ON r.id = e.roles_id;`
    db.query(query,function(err, results){
        if(err) throw err;
        
    const roleList=results.map((row) => row.title);
    const names=results.map((row)=> row.full_name);

    //console.log(roleList);
    //console.log(names);

    inquirer.prompt([
        {
            type:"input",
            name:"firstName",
            message:"What is the employee's first name?"
        },
        {
            type:"input",
            name:"lastName",
            message:"What is the employee's last name?"
        },
        {
            type:"list",
            name:"roles",
            message:"What is the employee's role?",
            choices: roleList
        },
        {
            type:"confirm",
            name:"supervisor",
            message:"Does the employee have a manager?"
        },
        {
            type:"list",
            name:"manager",
            message:"Who is the employee's manager?",
            choices: names,
            when:(answers) => answers.supervisor
        }
    ])
    .then((answers)=>{
       
        const roleId=answers.roles;
        const roleIndex=roleList.indexOf(roleId)+1;
        
        const nameId=answers.manager;
        const manager=names.indexOf(nameId)+1;

        var query=` INSERT INTO employee SET ?`
        db.query(query,
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                roles_id: roleIndex,
                manager_id: manager,
            },
            function(err,results){
                if (err) throw err;
                console.table(results);
                start();
            }
            );
    });
})
};

//Function for updating an existing employee
function updateEmployee(){
    displayEmployees();
};
function displayEmployees(){
    var query=
    `Select e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary
    FROM employee e
    JOIN roles r
    ON e.roles_id = r.id
    JOIN department d
    ON d.id = r.department_id
    `

    db.query(query, function(err, results){
        if (err) throw err;
        const selectEmployee= results.map(({ id, first_name, last_name})=>({
            value: id,
            name:`${first_name} ${last_name}`
        }));
        console.table(results);
        roleOptions(selectEmployee);
    })
};

function roleOptions(selectEmployee){
    var query= `SELECT title FROM roles`
    let addRole;
    db.query(query, function (err, results) {
        if (err) throw err;
    addRole=results.map((row) => row.title);
        rolePrompt(selectEmployee,addRole);
    })
}

function rolePrompt(selectEmployee, addRole){
    inquirer.prompt([
        {
            type:"list",
            name:"employees",
            message:"Which employee's role do you want to update?",
            choices: selectEmployee
        },
        {
            type:"list",
            name:"roles",
            message:"Which role do you want to assign to the selected employee?",
            choices: addRole
        },
    ])
    .then(function(answers){
        const roleId=answers.roles;
        const roleIndex=addRole.indexOf(roleId)+1;
        var query= `UPDATE employee SET roles_id = ? WHERE id = ?`
        db.query(query, [roleIndex, answers.employees],
            function(err,results){
                if(err) throw err;
                console.table(results);

                start();
            })
    });
};

//TO view all roles
function viewRoles(){
    var query=
    `SELECT r.id, r.title, r.salary, d.department_name
    FROM roles AS r
    JOIN department AS d ON r.department_id = d.id;`
    let addRole;
    db.query(query, function(err,results){
        if (err) throw err;
            addRole= results.map(({ id, title, salary})=>({
                value: id,
                title: `${title}`,
                salary: `${salary}`
            }));
            console.table(results)
            start();
    })
}

//Add a new role
function newRole(){
    var query=
    `SELECT department_name FROM department`
    db.query(query,function(err, results){
        if(err) throw err;
        
    const depts=results.map((row) => row.department_name);
    
    inquirer.prompt([
        {
            type:"input",
            name:"roleName",
            message:"What is the title of the new role?"
        },
        {
            type:"input",
            name:"salary",
            message:"What is the salary of the new role?"
        },
        {
            type:"list",
            name:"department",
            message:"What is the department of the new role?",
            choices: depts
        }
    ])
    .then((answers) => {
        const departmentId=answers.department;
        const departmentIndex=depts.indexOf(departmentId)+1;

        var query=`INSERT INTO roles SET ?`
        db.query(query,
            {
                title: answers.roleName,
                salary: answers.salary,
                department_id: departmentIndex,
            },
            function (err,results){
                if (err) throw err;
                console.table(results);
                start();
            })
        });
    });
};

//View all departments
function viewDepartments(){
    var query=
    `SELECT department_name FROM department`;
    db.query(query, function(err,results){
        if (err) throw err;
        console.table(results);
        start();
    });
};

//Add a new department
function addDepartment(){
    inquirer.prompt([
        {
            type:"input",
            name:"newDept",
            message:"What would you like to name the new department?"
        }
    ])
    .then((answers)=>{
        var query=`INSERT INTO department SET ?`
        db.query(query, {
            department_name:answers.newDept,
        },
        function (err,results){
            if (err) throw err;
            console.table(results);
            start();
        });
    });
}

//Delete a department, role or employee
function deleteX(){
    var query=
    `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department
    FROM employee e
    LEFT JOIN roles r
    ON e.roles_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id`

    db.query(query, function(err, results){
        if (err) throw err;
        
        const selectEmployee=results.map(({id, first_name, last_name})=>({
            value: id, name: `${id} ${first_name} ${last_name}`
        })); 
        const selectRole=results.map((row) => row.title);
        const selectDept=results.map((row) => row.department_name);


   
    inquirer.prompt([
        {
            type:"list",
            name:"selectFunction",
            message:"What entry type would you like to remove?",
            choices:["Employee","Role","Department"]
        },
        {
            type:"list",
            name:"employees",
            message:"Which employee would you like to remove?",
            choices: selectEmployee,
            when:(answers)=> answers.selectFunction === "Employee"
        },
        {
            type:"list",
            name:"roles",
            message:"Which role would you like to delete?",
            choices: selectRole,
            when:(answers)=> answers.selectFunction === "Role"
        },
        {
            type:"list",
            name:"dept",
            message:"Which department would you like to delete?",
            choices: selectDept,
            when:(answers)=> answers.selectFunction === "Department"
        },
    ])
   
})
}