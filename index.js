const inquirer = require('inquirer');
const mysql = require('mysql2')
const { MainMenuQuestions, AddDepartmentQuestions, AddEmployeeQuestions, AddRoleQuestions, UpdateEmployeeRoleQuestions } = require('./questions');
const { response } = require('express');
require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        //  MySQL password
        password: process.env.DB_PASSWORD,
        database: 'employees_db',
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect();

const doMenuQuestions = () => {

    inquirer.prompt(MainMenuQuestions)
        .then((response) => {
            switch (response.option) {
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

const add_department = () => {
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
            type: 'number', name: 'salary', message: 'Enter salary for the New Role: (numbers only) ',
            validate: function (value) {
                const valid = !isNaN(parseInt(value));
                return valid || 'ENTER numbers only!';
            }
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the DEPARTMENT for the Role:  ',
            choices: department.map(({ id, name }) => {
                return {
                    value: id, name

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

const update_role = async () => {
    // grabs all employee data
    db.query(`SELECT * FROM employee`, (err, response) => {
        if (err) throw err;

        const employees = response.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
            .then(empChoice => {
                const employee = empChoice.name;
                const params = [];
                params.push(employee); // => params = ["Bruce Payne"]

                db.query(`SELECT * FROM role`, (err, data) => {
                    if (err) throw err;

                    const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's new role?",
                            choices: roles
                        }
                    ])
                        .then(roleChoice => {
                            const role = roleChoice.role;
                            params.push(role);

                            let employee = params[0]
                            params[0] = role
                            params[1] = employee
                            // params = ["Web Developer" = id:2, "Bruce Payne" = id:3]

                            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, params, (err, result) => {
                                if (err) throw err;
                                console.log("Employee has been updated!");

                                doMenuQuestions();
                            });
                        });
                });
            });
    });
}

const view_employees = async () => {

    const [employee] = await db.promise().query(`SELECT * FROM employee`)

    console.table(employee)
    doMenuQuestions();

}

const add_employee = async () => {
    const [role] = await db.promise().query(`SELECT * FROM role`)
    const [employee] = await db.promise().query(`SELECT * FROM employee`)

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
            choices: role.map(({ id, title }) => {
                return {
                    name: title,
                    value: id,
                }
            }),
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Select the Employee\'s MANAGER:  ",
            choices: employee.map(({ id, first_name, last_name }) => {
                return {
                    name: `${first_name}  ${last_name}`,
                    value: id
                }
            }),
        },
    ])
        .then(async (response) => {
            const [employee] = await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${response.first_name}','${response.last_name}',${response.role_id}, ${response.manager_id})`)

            view_employees();
        })
}




doMenuQuestions();