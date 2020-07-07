import {takeLatest, all, put} from 'redux-saga/effects';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

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
    DELETE_EMPLOYEE_SUBMITTING,
    DELETE_EMPLOYEE_SUCCEEDED,
    DELETE_EMPLOYEE_FAILED,
    DELETE_EMPLOYEE,
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

        let formData = new FormData();
        _.forIn(action.payload, function(value, field) {
            if (!_.isArrayLikeObject(value)) {
                formData.append(field, value);
            }
        });

        formData.set('birthday', moment(action.payload.birthday).format('YYYY-MM-DD'));
        if (_.isArrayLikeObject(action.payload.photo) && action.payload.photo[0]) {
            formData.append('photo', action.payload.photo[0]);
        }

        responseCreate = yield axios.post(apiUrl + '/employees', formData, headerConfig);
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

        let formData = new FormData();
        _.forIn(action.payload, function(value, field) {
            if (!_.isArrayLikeObject(value)) {
                formData.append(field, value);
            }
        });

        formData.set('birthday', moment(action.payload.birthday).format('YYYY-MM-DD'));
        if (_.isArrayLikeObject(action.payload.photo) && action.payload.photo[0]) {
            formData.append('photo', action.payload.photo[0]);
        }

        responseCreate = yield axios.post(apiUrl + '/employees/' + action.payload.id , formData, headerConfig);
        response = yield axios.get(apiUrl + '/employees', headerConfig);

        yield put({type: UPDATE_EMPLOYEE_SUCCEEDED, payload: {isSuccess: true, data: responseCreate.data?.data}});
        yield put({type: FETCH_EMPLOYEES_SUCCEEDED, payload: {isSuccess: true, data: response.data?.data}});
    } catch (e) {
        const errorMessage = e?.response?.data?.message;
        yield put({type: UPDATE_EMPLOYEE_FAILED, payload: {isSuccess: false, message: errorMessage}});
    }
}

function* deleteEmployee(action) {
    let response;

    const headerConfig = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN_KEY)
        }
    };

    try {
        yield put({type: DELETE_EMPLOYEE_SUBMITTING});

        yield axios.delete(apiUrl + '/employees/' + action.payload , headerConfig);
        response = yield axios.get(apiUrl + '/employees', headerConfig);

        yield put({type: DELETE_EMPLOYEE_SUCCEEDED, payload: {isSuccess: true}});
        yield put({type: FETCH_EMPLOYEES_SUCCEEDED, payload: {isSuccess: true, data: response.data?.data}});
    } catch (e) {
        const errorMessage = e?.response?.data?.message;
        yield put({type: DELETE_EMPLOYEE_FAILED, payload: {isSuccess: false, message: errorMessage}});
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
        yield takeLatest(DELETE_EMPLOYEE, deleteEmployee),
    ])
}