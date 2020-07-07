import React, { useEffect, useState } from 'react';
import { AUTH_TOKEN_KEY } from '../constant';
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isSuccess = useSelector(state => state.login.isSuccess);

    React.useEffect(() => {
        const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
        if (authToken && authToken !== '') {
            setIsLoggedIn(true);
        }
    }, [isSuccess]);

    const logoutClicked = (e) => {
        setIsLoggedIn(false);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        history.push("/");
    };

    return (
        <div>
            {
                isLoggedIn &&
                <Navbar>
                    <NavbarGroup align={Alignment.LEFT}>
                        <NavbarHeading>Employee Directory</NavbarHeading>
                        <NavbarDivider />
                        <Button className={Classes.MINIMAL} icon="home" text="Home" />
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Button className={Classes.MINIMAL} icon="log-out" text="Logout" onClick={logoutClicked} />
                    </NavbarGroup>
                </Navbar>
            }
        </div>
    );
}

export default Header;