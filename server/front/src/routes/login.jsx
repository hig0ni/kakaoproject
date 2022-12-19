import './login.css';

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

export default Login;
