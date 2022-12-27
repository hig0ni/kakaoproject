import React, {useState} from "react";
import axios from "axios";
import "../styles/Register.scss";

function Register() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputPw2, setInputPw2] = useState("");
    const [inputNn, setInputNn] = useState("");

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const handleInputPw2 = (e) => {
        setInputPw2(e.target.value);
    };

    const handleInputNn = (e) => {
        setInputNn(e.target.value);
    };

    // register 버튼 클릭 이벤트
    const onClickregister = () => {
        //axios.post('url','body 자리', callback함수)
        //요청 url에서 bodyparser 설정 후 req.body로 읽을 수 있음
        axios
            .post("/user_inform/onRegister", null, {
                params: {
                    user_id: inputId,
                    user_pw: inputPw,
                    user_pw2: inputPw2,
                    user_Nn: inputNn
                },
            })
            .then((res) => {
                if (res.data.registerStatusCode === 0) {
                    // id 일치하지 않는 경우
                    alert("입력되지 않은 정보가 있습니다.");
                    document.location.href = "/register";
                } else if (res.data.registerStatusCode === 1) {
                    alert("회원가입이 완료되었습니다!");
                    document.location.href = "/";
                } else if (res.data.registerStatusCode === 2) {
                    alert("입력된 비밀번호가 서로 다릅니다.");
                    document.location.href = "/register";
                } else if (res.data.registerStatusCode === 3) {
                    alert("이미 존재하는 아이디 입니다.");
                    document.location.href = "/register";
                } else if (res.data.registerStatusCode === 4) {
                    alert("이미 존재하는 닉네임 입니다.");
                    document.location.href = "/register";
                }
            })
            .catch();
    };

    return (
        <div className="content">
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <form className="register" action="/register" method="post">
                <h2>회원가입</h2>
                <div className="register_id">
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
                <div className="register_pw">
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
                <div className="register_pw_verification">
                    <h3>
                        <i className="material-icons prefix">vpn_key</i>Password verification
                    </h3>
                    <input
                        type="password"
                        name="input_pw2"
                        value={inputPw2}
                        placeholder="Password verification"
                        onChange={handleInputPw2}
                    />
                </div>
                <div className="register_Nn">
                    <h3>
                    <i className="material-icons prefix">local_offer</i>Nickname
                    </h3>
                    <input
                        type="text"
                        name="input_Nn"
                        value={inputNn}
                        placeholder="Nickname"
                        onChange={handleInputNn}
                    />
                </div>
                <div>
                    <button className="btn" type="button" onClick={onClickregister}>
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
