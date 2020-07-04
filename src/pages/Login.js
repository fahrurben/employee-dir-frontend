import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormGroup, InputGroup, Button, Card, Colors } from '@blueprintjs/core';

import { LOGIN_SUBMITTING, LOGIN_RESET, AUTH_TOKEN_KEY } from '../constant';

function Login() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isSubmitted = useSelector(state => state.login.isSubmitted);
    const errorMessage = useSelector(state => state.login.errorMessage);
    const isSuccess = useSelector(state => state.login.isSuccess);

    const emailOnChange = e => {
        setEmail(e.target.value);
    };
    const passwordOnChange = e => {
        setPassword(e.target.value);
    };

    const submitClicked = e => {
        e.preventDefault();

        dispatch({type: LOGIN_SUBMITTING, payload: { email, password }});
    };

    useEffect(() => {
        if (isSubmitted && isSuccess) {
            console.log(localStorage.getItem(AUTH_TOKEN_KEY));
        }
    }, [isSubmitted]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center bg-gray-200 h-screen">
                <Card interactive={true} className="w-1/3">
                    <h3>Login</h3>
                    {
                        isSubmitted && !isSuccess &&
                        <div style={{ color: Colors.RED3 }}>{ errorMessage }</div>
                    }
                    <FormGroup
                        label="Email"
                        labelFor="email"
                        labelInfo="(required)"
                    >
                        <InputGroup id="email" placeholder=""  onChange={emailOnChange}  />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="password"
                        labelInfo="(required)"
                    >
                        <InputGroup id="password" placeholder="" type="password" onChange={passwordOnChange} />
                    </FormGroup>
                    <Button text="Submit" onClick={submitClicked} />
                </Card>
            </div>
        </div>
    );
}

export default Login;