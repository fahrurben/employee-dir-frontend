import {
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_DEPARTMENTS_SUCCEEDED
} from '../constant';

function employeeReducer(state = {
    isSubmitted: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
    list: [],
    departments: [],
}, action) {
    switch (action.type) {
        case FETCH_EMPLOYEES_SUCCEEDED:
            return { ...state, list: action.payload.data };
        case FETCH_DEPARTMENTS_SUCCEEDED:
            return { ...state, departments: action.payload.data };
        default:
            return { ...state };
    }
}

export default employeeReducer;