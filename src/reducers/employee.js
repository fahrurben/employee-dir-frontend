import {
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_DEPARTMENTS_SUCCEEDED,
    GET_EMPLOYEE_SUCCEEDED,
    CREATE_EMPLOYEE_SUBMITTING,
    CREATE_EMPLOYEE_SUCCEEDED,
    CREATE_EMPLOYEE_FAILED,
    RESET_EMPLOYEE_FORM,
    UPDATE_EMPLOYEE_SUBMITTING,
    UPDATE_EMPLOYEE_SUCCEEDED,
    UPDATE_EMPLOYEE_FAILED,
} from '../constant';

function employeeReducer(state = {
    isSubmitted: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    list: [],
    page: 1,
    totalPage: 1,
    departments: [],
    employee: {}
}, action) {
    switch (action.type) {
        case CREATE_EMPLOYEE_SUBMITTING:
        case UPDATE_EMPLOYEE_SUBMITTING:
            return {...state, isSubmitted: false, isSuccess: false};
        case CREATE_EMPLOYEE_SUCCEEDED:
        case UPDATE_EMPLOYEE_SUCCEEDED:
            return {...state, isSubmitted: true, isSuccess: true};
        case CREATE_EMPLOYEE_FAILED:
        case UPDATE_EMPLOYEE_FAILED:
            return {...state, isSubmitted: true, isSuccess: false};
        case FETCH_EMPLOYEES_SUCCEEDED:
            return {
                ...state,
                list: action.payload.data,
                page: action.payload.meta?.current_page,
                totalPage: action.payload.meta?.last_page
            };
        case FETCH_DEPARTMENTS_SUCCEEDED:
            return {...state, departments: action.payload.data};
        case GET_EMPLOYEE_SUCCEEDED:
            return {...state, employee: action.payload.data};
        case RESET_EMPLOYEE_FORM:
            return {...state, employee: {}};
        default:
            return {...state};
    }
}

export default employeeReducer;