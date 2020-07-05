import { combineReducers } from 'redux';

import login from './login';
import employee from './employee';

const rootReducers = combineReducers({
    login,
    employee
});

export default rootReducers;
