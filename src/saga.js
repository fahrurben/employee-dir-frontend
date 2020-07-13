import {takeLatest, all, put} from 'redux-saga/effects';

import {
    LOGIN_SUBMITTING,
    FETCH_EMPLOYEES,
    FETCH_DEPARTMENTS,
    CREATE_EMPLOYEE,
    GET_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE, CHECK_AVAILABILITY,
} from './constant';

import {
    checkBackendAvailability,
    loginSubmit,
    getEmployees,
    getDepartments,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from './services';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        yield takeLatest(CHECK_AVAILABILITY, checkBackendAvailability),
        yield takeLatest(LOGIN_SUBMITTING, loginSubmit),
        yield takeLatest(FETCH_DEPARTMENTS, getDepartments),
        yield takeLatest(FETCH_EMPLOYEES, getEmployees),
        yield takeLatest(CREATE_EMPLOYEE, createEmployee),
        yield takeLatest(GET_EMPLOYEE, getEmployee),
        yield takeLatest(UPDATE_EMPLOYEE, updateEmployee),
        yield takeLatest(DELETE_EMPLOYEE, deleteEmployee),
    ])
}