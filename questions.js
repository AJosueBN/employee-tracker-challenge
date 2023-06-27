const MainMenuQuestions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {value: 'view_departments', name: 'view all departments'},
            {value: 'view_roles', name: 'view all roles'},
            {value: 'view_employees', name: 'view all employees'},
            {value: 'add_department', name: 'add a department'},
            {value: 'add_role', name: 'add a role'},
            {value: 'add_employee', name: 'add an employee'},
            {value: 'update_role', name: 'update an employee role'},
        ],
    },
]

const AddDepartmentQuestions= [
    {
        type: 'input',
        name: 'department_name',
        message: 'Enter NAME for the new Department:  '
    },
]

const AddRoleQuestions= [
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
        choices: [] ,
    },
]

const AddEmployeeQuestions = [
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
        choices: [],
    },
    {
        type: 'list',
        name: 'manager_id',
        message: "Select the Employee\'s MANAGER:  ",
        choices: [],
    },
]

const UpdateEmployeeRoleQuestions = [
    {
        type: 'list',
        name: 'employee_id',
        message: 'Select Employee to Update:  ',
        choices: [],
    },
    {
        type: 'list',
        name: 'role_id',
        message: "Select the Employee\'s New Role :   ",
        choices: [],
    },
]

module.exports = {MainMenuQuestions , AddDepartmentQuestions, AddEmployeeQuestions , AddRoleQuestions, UpdateEmployeeRoleQuestions }



