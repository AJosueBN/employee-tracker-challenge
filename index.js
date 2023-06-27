const inquirer = require('inquirer');
const mysql = require('mysql')
const {MainMenuQuestions , AddDepartmentQuestions, AddEmployeeQuestions , AddRoleQuestions, UpdateEmployeeRoleQuestions};


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