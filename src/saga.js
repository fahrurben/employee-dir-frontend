import {takeLatest, all, put} from 'redux-saga/effects';
import axios from 'axios';
import qs from 'qs';

import {
    AUTH_TOKEN_KEY,
    LOGIN_SUBMITTING,
    LOGIN_SUBMITTED,
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEES_SUCCEEDED,
    FETCH_EMPLOYEES_FAILED,
    FETCH_DEPARTMENTS,
    FETCH_DEPARTMENTS_SUCCEEDED,
    FETCH_DEPARTMENTS_FAILED,
    CREATE_EMPLOYEE,
    CREATE_EMPLOYEE_SUBMITTING,
    CREATE_EMPLOYEE_SUCCEEDED,
    CREATE_EMPLOYEE_FAILED,
    GET_EMPLOYEE,
    GET_EMPLOYEE_SUCCEEDED,
    UPDATE_EMPLOYEE,
    UPDATE_EMPLOYEE_SUBMITTING,
    UPDATE_EMPLOYEE_SUCCEEDED,
    UPDATE_EMPLOYEE_FAILED,
} from './constant';

const apiUrl = process.env.REACT_APP_API_URL;

function* loginSubmit(action) {
    const email = action.payload.email;
    const password = action.payload.password;

    let response = null;
    try {
        response = yield axios.post(apiUrl + '/authenticate', {email, password});
        localStorage.setItem(AUTH_TOKEN_KEY, response?.data?.data);
        yield put({type: LOGIN_SUBMITTED, payload: {isSuccess: true, message: ''}});
    } catch (e) {
        const errorMessage = e?.response?.data?.message;
        yield put({type: LOGIN_SUBMITTED, payload: {isSuccess: false, message: errorMessage}});
    }
}

function* getDepartments(action) {
    const headerConfig = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN_KEY)
        }
    };

    let response = null;
    try {
        response = yield axios.get(apiUrl + '/departments', headerConfig);
        yield put({type: FETCH_DEPARTMENTS_SUCCEEDED, payload: {isSuccess: true, data: response.data?.data}});
    } catch (e) {
        const errorMessage = e?.response?.data?.message;
        yield put({type: FETCH_DEPARTMENTS_FAILED, payload: {isSuccess: false, message: errorMessage}});
    }
}

function* getEmployees(action) {
    const headerConfig = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN_KEY)
        }
    };

    let page = action?.page;

    let response = null;
    try {
        response = yield axios.get(apiUrl + '/employees?page=' + page, headerConfig);
        yield put({
            type: FETCH_EMPLOYEES_SUCCEEDED,
            payload: {
                isSuccess: true,
                data: response.data?.data,
                meta: response.data?.meta
            }
        });
    } catch (e) {
        const errorMessage = e?.response?.data?.message;
        yield put({type: FETCH_EMPLOYEES_FAILED, payload: {isSuccess: false, message: errorMessage}});
    }
}

function* getEmployee(action) {
    const headerConfig = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN_KEY)
        }
    };

    let response = null;
    try {
        response = yield axios.get(apiUrl + '/employees/' + action.payload, headerConfig);
        yield put({
            type: GET_EMPLOYEE_SUCCEEDED,
            payload: { data: response.data?.data }
        });
    } catch (e) {}
}

function* createEmployee(action) {
    let response, responseCreate = null;

    const headerConfig = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN_KEY)
        }
    };

    try {
        yield put({type: CREATE_EMPLOYEE_SUBMITTING});

        responseCreate = yield axios.post(apiUrl + '/employees', qs.stringify(action.payload), headerConfig);
        response = yield axios.get(apiUrl + '/employees', headerConfig);

        yield put({type: CREATE_EMPLOYEE_SUCCEEDED, payload: {isSuccess: true, data: responseCreate.data?.data}});
        yield put({type: FETCH_EMPLOYEES_SUCCEEDED, payload: {isSuccess: true, data: response.data?.data}});
    } catch (e) {
        const errorMessage = e?.response?.data?.message;
        yield put({type: CREATE_EMPLOYEE_FAILED, payload: {isSuccess: false, message: errorMessage}});
    }
}

function* updateEmployee(action) {
    let response, responseCreate = null;

    const headerConfig = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN_KEY)
        }
    };

    try {
        yield put({type: UPDATE_EMPLOYEE_SUBMITTING});

        responseCreate = yield axios.post(apiUrl + '/employees/' + action.payload.id , qs.stringify(action.payload), headerConfig);
        response = yield axios.get(apiUrl + '/employees', headerConfig);

        yield put({type: UPDATE_EMPLOYEE_SUCCEEDED, payload: {isSuccess: true, data: responseCreate.data?.data}});
        yield put({type: FETCH_EMPLOYEES_SUCCEEDED, payload: {isSuccess: true, data: response.data?.data}});
    } catch (e) {
        const errorMessage = e?.response?.data?.message;
        yield put({type: UPDATE_EMPLOYEE_FAILED, payload: {isSuccess: false, message: errorMessage}});
    }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        yield takeLatest(LOGIN_SUBMITTING, loginSubmit),
        yield takeLatest(FETCH_DEPARTMENTS, getDepartments),
        yield takeLatest(FETCH_EMPLOYEES, getEmployees),
        yield takeLatest(CREATE_EMPLOYEE, createEmployee),
        yield takeLatest(GET_EMPLOYEE, getEmployee),
        yield takeLatest(UPDATE_EMPLOYEE, updateEmployee),
    ])
}