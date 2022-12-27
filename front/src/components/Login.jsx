import React, { useState} from "react";
import axios from "axios";
import "../styles/Login.scss";

function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        //axios.post('url','body 자리', callback함수)
        //요청 url에서 bodyparser 설정 후 req.body로 읽을 수 있음
        axios
            .post("/user_inform/onLogin", null, {
                params: {
                    user_id: inputId,
                    user_pw: inputPw
                },
            })
            .then((res) => {
                if (res.data.loginStatusCode === 0) {
                    // id 일치하지 않는 경우
                    alert("입력하신 아이디가 일치하지 않습니다.");
                    document.location.href = "/login";
                } else if (res.data.loginStatusCode === 1) {
                    alert("입력하신 비밀번호가 일치하지 않습니다.");
                    document.location.href = "/login";
                } else if (res.data[0] === inputId) {
                    alert("로그인 성공");
                    sessionStorage.setItem("user_id", inputId);
                    document.location.href = "/main";
                }
            })
            .catch();
    };

    /*/// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/user_inform/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])*/

    return (
        <div className="content">
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <form className="login" action="/login" method="post">
                <h2>로그인</h2>
                <div className="login_id">
                    <h3>
                        <i className="material-icons prefix">account_circle</i>
                        ID
                    </h3>
                    <input
                        type="text"
                        name="input_id"
                        value={inputId}
                        placeholder="ID"
                        onChange={handleInputId}
                    />
                </div>
                <div className="login_pw">
                    <h3>
                        <i className="material-icons prefix">vpn_key</i>Password
                    </h3>
                    <input
                        type="password"
                        name="input_pw"
                        value={inputPw}
                        placeholder="Password"
                        onChange={handleInputPw}
                    />
                </div>
                <div>
                    <button className="btn" type="button" onClick={onClickLogin}>
                        로그인
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;