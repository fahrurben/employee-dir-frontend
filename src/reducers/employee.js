import {
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_DEPARTMENTS_SUCCEEDED,
    CREATE_EMPLOYEE_SUBMITTING,
    CREATE_EMPLOYEE_SUCCEEDED,
    CREATE_EMPLOYEE_FAILED,
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
}, action) {
    switch (action.type) {
        case CREATE_EMPLOYEE_SUBMITTING:
            return { ...state, isSubmitted: false, isSuccess: false };
        case CREATE_EMPLOYEE_SUCCEEDED:
            return { ...state, isSubmitted: true, isSuccess: true };
        case CREATE_EMPLOYEE_FAILED:
            return { ...state, isSubmitted: true, isSuccess: false };
        case FETCH_EMPLOYEES_SUCCEEDED:
            return {
                ...state,
                list: action.payload.data,
                page: action.payload.meta?.current_page,
                totalPage: action.payload.meta?.last_page
            };
        case FETCH_DEPARTMENTS_SUCCEEDED:
            return { ...state, departments: action.payload.data };
        default:
            return { ...state };
    }
}

export default employeeReducer;