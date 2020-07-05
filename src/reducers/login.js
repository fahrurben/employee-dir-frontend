import { LOGIN_SUBMITTING, LOGIN_SUBMITTED, LOGIN_RESET} from '../constant';

function loginReducer(state = {
    isSubmitted: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: '',
}, action) {
    switch (action.type) {
        case LOGIN_SUBMITTING:
            return {
                ...state,
                isSubmitted: false,
                isLoading: true,
            };
        case LOGIN_SUBMITTED:
            return {
                ...state,
                isSubmitted: true,
                isSuccess: action.payload.isSuccess,
                isLoading: false,
                errorMessage: action.payload.message
            };
        case LOGIN_RESET:
            return {
                isSubmitted: false,
                isSuccess: false,
                errorMessage: '',
            };
        default:
            return { ...state };
    }
}

export default loginReducer;