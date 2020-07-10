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
    const isLoading = useSelector(state => state.login.isLoading);

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
            dispatch({type: LOGIN_RESET});
            history.push("/home");
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
                        helperText="Demo account: admin@edir.com"
                    >
                        <InputGroup id="email" placeholder=""  onChange={emailOnChange}  />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="password"
                        labelInfo="(required)"
                        helperText="Demo password: admin"
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