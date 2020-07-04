import { takeLatest, all, put } from 'redux-saga/effects';
import axios from 'axios';

import { AUTH_TOKEN_KEY, LOGIN_SUBMITTING, LOGIN_SUBMITTED } from './constant';

function* loginSubmit(action) {
    const email = action.payload.email;
    const password = action.payload.password;

    const apiUrl = process.env.REACT_APP_API_URL;
    let response = null;

    console.log(action.type);
    try {
        response = yield axios.post(apiUrl + '/authenticate', { email, password });

        localStorage.setItem(AUTH_TOKEN_KEY, response?.data?.data);
        yield put({ type: LOGIN_SUBMITTED, payload: { isSuccess: true, message: '' } });
    } catch(e) {
        const errorMessage = e?.response?.data?.message;
        yield put({ type: LOGIN_SUBMITTED, payload: { isSuccess: false, message: errorMessage } });
    }

}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        yield takeLatest(LOGIN_SUBMITTING, loginSubmit)
    ])
}