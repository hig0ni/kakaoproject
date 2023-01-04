import { React, useState, useRef } from "react";
import axios from "axios";
import "../styles/Register.scss";

function Register() {
    const inputIdRef = useRef(null);
    const inputPwRef = useRef(null);
    const inputNnRef = useRef(null);
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
    const RegisterCheck = () => {
        //axios.post('url','body 자리', callback함수)
        //요청 url에서 bodyparser 설정 후 req.body로 읽을 수 있음
        axios
            .post("/user_inform/onRegister", null, {
                params: {
                    user_id: inputId,
                    user_pw: inputPw,
                    user_pw2: inputPw2,
                    user_Nn: inputNn,
                }
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
    function checkAll() {
        if (!CheckUserId(inputId)) {
            return false;
        }
        if (!CheckNickname(inputNn)) {
            return false;
        }
        if (!CheckPassword(inputId, inputPw)) {
            return false;
        }

        return true;
    }

    // 공백확인 함수
    function checkExistData(value, dataName) {
        if (value === "") {
            alert(dataName + " 입력해주세요!");
            return false;
        }
        return true;
    }

    function CheckUserId(id) {
        //Id가 입력되었는지 확인하기
        if (!checkExistData(id, "아이디를")) return false;

        var idRegExp = /^[a-zA-z0-9]{2,16}$/; //아이디 유효성 검사
        if (!idRegExp.test(id)) {
            alert("아이디는 영문 대소문자와 숫자 2 ~ 16자리로 입력해야합니다!");
            inputIdRef.current.value = "";
            inputPwRef.current.value = "";
            inputNnRef.current.value = "";
            return false;
        }
        return true; //확인이 완료되었을 때
    }

    function CheckNickname(nickname) {
        //닉네임이 입력되었는지 확인하기
        if (!checkExistData(nickname, "닉네임을")) return false;

        var nicknameRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/; //닉네임 유효성 검사
        if (!nicknameRegExp.test(nickname)) {
            alert("닉네임은 한글 2 ~ 6자리로 입력해야합니다!");
            inputIdRef.current.value = "";
            inputPwRef.current.value = "";
            inputNnRef.current.value = "";
            return false;
        }

        RegisterCheck(); //확인이 완료되었을 때
    }

    function CheckPassword(id, password1) {
        //비밀번호가 입력되었는지 확인하기
        if (!checkExistData(password1, "비밀번호를")) return false;

        var password1RegExp = /^[a-zA-z0-9]{2,16}$/; //비밀번호 유효성 검사
        if (!password1RegExp.test(password1)) {
            alert("비밀번호는 영문 대소문자와 숫자 2 ~ 16자리로 입력해야합니다!");
            inputIdRef.current.value = "";
            inputPwRef.current.value = "";
            inputNnRef.current.value = "";
            return false;
        }

        RegisterCheck(); //확인이 완료되었을 때
    }

    return (
        <body class="text-center">
            <main class="form-signin w-100 m-auto">
                <form action="/register" method="post">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-person-plus"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path
                            fill-rule="evenodd"
                            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                        />
                    </svg>
                    <h1 class="h3 mb-3 fw-normal">회원가입</h1>

                    <div class="form-floating">
                        <input
                            type="text"
                            name="input_id"
                            value={inputId}
                            class="form-control"
                            id="floatingInput"
                            placeholder="ID"
                            onChange={handleInputId}
                            ref={inputIdRef}
                            minLength={2}
                            maxLength={16}
                            required
                        />
                        <label for="floatingInput">ID</label>
                    </div>
                    <div class="form-floating">
                        <input
                            type="text"
                            name="input_Nn"
                            value={inputNn}
                            class="form-control"
                            id="floatingInput2"
                            placeholder="Nickname"
                            onChange={handleInputNn}
                            ref={inputNnRef}
                            minLength={2}
                            maxLength={6}
                            required
                        />
                        <label for="floatingPassword">Nickname</label>
                    </div>
                    <div class="form-floating">
                        <input
                            type="password"
                            name="input_pw"
                            value={inputPw}
                            class="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={handleInputPw}
                            ref={inputPwRef}
                            minLength={2}
                            maxLength={16}
                            required
                        />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating">
                        <input
                            type="password"
                            name="input_pw2"
                            value={inputPw2}
                            class="form-control password2"
                            id="floatingPassword2"
                            placeholder="Password verification"
                            onChange={handleInputPw2}
                            ref={inputPwRef}
                            minLength={2}
                            maxLength={16}
                            required
                        />
                        <label for="floatingPassword">Password verification</label>
                    </div>

                    <button
                        class="w-100 btn btn-lg btn-primary"
                        type="button"
                        onClick={checkAll}
                    >
                        Sign in
                    </button>
                </form>
            </main>
        </body>
    );
}

export default Register;
