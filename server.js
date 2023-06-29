//Require dependencies
const inquirer=require("inquirer");
const mysql= require("mysql2");
require("console.table");
require("dotenv").config();

const setup=process.env;

const db=mysql.createConnection({
    host: setup.DB_HOST,
    user: setup.DB_USER,
    password: setup.DB_PASS,
    database: "employess_db"
});

