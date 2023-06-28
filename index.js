const inquirer = require('inquirer');
const mysql = require('mysql2')
const {MainMenuQuestions , AddDepartmentQuestions, AddEmployeeQuestions , AddRoleQuestions, UpdateEmployeeRoleQuestions} = require('./questions');
require('console.table')

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      //  MySQL password
      password: 'granted123',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  db.connect();

const doMenuQuestions = () => {

    inquirer.prompt(MainMenuQuestions)
    .then((response)  => {
        switch(response.option) {
            case 'view_departments':
            view_departments();
            break;
            case 'view_roles':
            view_roles();
            break;
            case 'view_employees':
            view_employees();
            break;
            case 'add_department':
            add_department();
            break;
            case 'add_role':
            add_role();
            break;
            case 'add_employee':
            add_employee();
            break;
            case 'update_role':
            update_role();
            break;
            
        }
    })
}
const view_departments = async () => {
    
       const [department] = await db.promise().query(`SELECT * FROM department`)

       console.table(department)
       doMenuQuestions();
   
}

const add_department =  () => {
    inquirer.prompt(AddDepartmentQuestions)
    .then(async (response) => {
       const [department] = await db.promise().query(`Insert into department (name) values('${response.department_name}')`)

       view_departments()
    })
}

const view_roles = async () => {
    
    const [role] = await db.promise().query(`SELECT * FROM role`)

    console.table(role)
    doMenuQuestions();

}

const add_role = async () => {
    const [department] = await db.promise().query(`SELECT * FROM department`)

    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter TITLE for the new Role:  '
        },
        {
            type: 'number', name: 'salary' , message: 'Enter salary for the New Role: (numbers only) ',
            validate: function (value) {
                const valid = !isNaN(parseInt(value));
                return valid || 'ENTER numbers only!';
            }
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the DEPARTMENT for the Role:  ',
            choices: department.map(({id,name}) => {
                return {
                    value:id,name
            
                }
            }),
        },
    ]
    )
    .then(async (response) => {
       const [role] = await db.promise().query(`Insert into role (title, salary, department_id) values('${response.title}',${response.salary},${response.department_id})`)

       view_roles();
    })
}

const view_employees = async () => {
    
    const [employee] = await db.promise().query(`SELECT * FROM employee`)

    console.table(employee)
    doMenuQuestions();

    
}

const add_employee = async () => {
    const [role] = await db.promise().query(`SELECT * FROM role`)

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter FIRST name of the Employee:  '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter LAST name of the Employee:  '
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select ROLE for the Employee:  ',
            choices: role.map(({id , title , salary , department_id }) => {
                return {
                    value:id,title,salary,department_id
                }
            }),
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Select the Employee\'s MANAGER:  ",
            choices: role.map(({id , first_name , last_name }) => {
                 return {
                    value:id,first_name,last_name
                 }
            }),
        },
    ])
    .then(async (response) => {
       const [role] = await db.promise().query(`Insert into employee role (first_name, last_name, role_id) values('${response.first_name}',${response.last_name},${response.role_id})`)

       view_employees();
    })
}

doMenuQuestions();