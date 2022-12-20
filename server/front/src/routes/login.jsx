/*import './Login.css';

const Login = () => {
    return (
        <div className="content">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <form className="login" action="/login" method="post">
                <h2>로그인</h2>
                <div className="login_id">
                    <h3>
                        <i class="material-icons prefix">account_circle</i>ID
                    </h3>
                    <input type="text" name="id" id="id" placeholder="ID" />
                </div>
                <div className="login_pw">
                    <h3>
                        <i class="material-icons prefix">vpn_key</i>Password
                    </h3>
                    <input type="password" name="pw" id="pw" placeholder="Password" />
                </div>
                <div className="submit">
                    <input type="submit" value="submit" />
                </div>
            </form>
        </div>
    );
};

export default Login;*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { LoginUser } from './LoginUser';

const Login = () => {
    const dispatch = useDispatch();

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('Id', Id);
        console.log('Password', Password);
        
        let body = {
            Id: Id,
            password: Password,
        }

        dispatch(LoginUser(body));
    }

    return (
        <div className="content">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <form className="login" action="/login" method="post" onSubmit={onSubmitHandler}>
                <h2>로그인</h2>
                <div className="login_id">
                    <h3>
                        <i class="material-icons prefix">account_circle</i>ID
                    </h3>
                    <input type="text" id="id" value={Id} placeholder="ID" onChange={onIdHandler} />
                </div>
                <div className="login_pw">
                    <h3>
                        <i class="material-icons prefix">vpn_key</i>Password
                    </h3>
                    <input type="password" id="password" value={Password} placeholder="Password" onChange={onPasswordHandler} />
                </div>
                <div className="submit">
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    );
};

export default Login;