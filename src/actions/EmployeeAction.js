import {CHECK_AVAILABILITY, DELETE_EMPLOYEE, GET_EMPLOYEE, RESET_EMPLOYEE_FORM} from "../constant";
import {FETCH_EMPLOYEES} from "../constant";
import {FETCH_DEPARTMENTS} from "../constant";
import {CREATE_EMPLOYEE} from "../constant";
import {UPDATE_EMPLOYEE} from "../constant";

function makeActionCreator(type, ...argNames) {
    return function (...args) {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action;
    }
}

export const checkAvailability = makeActionCreator(CHECK_AVAILABILITY);
export const fetchEmployees = makeActionCreator(FETCH_EMPLOYEES, 'page');
export const getEmployee = makeActionCreator(GET_EMPLOYEE, 'payload');
export const fetchDepartments = makeActionCreator(FETCH_DEPARTMENTS);
export const createEmployee = makeActionCreator(CREATE_EMPLOYEE, 'payload');
export const updateEmployee = makeActionCreator(UPDATE_EMPLOYEE, 'payload');
export const deleteEmployee = makeActionCreator(DELETE_EMPLOYEE, 'payload');
export const resetEmployeeForm = makeActionCreator(RESET_EMPLOYEE_FORM);