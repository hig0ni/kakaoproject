import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/Login.scss";

function Login() {
    const inputIdRef = useRef(null);
    const inputPwRef = useRef(null);
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
    const LoginCheck = () => {
        console.log("HellO!");
        //axios.post('url','body 자리', callback함수)
        //요청 url에서 bodyparser 설정 후 req.body로 읽을 수 있음
        axios
            .post("/user_inform/onLogin", null, {
                params: {
                    user_id: inputId,
                    user_pw: inputPw,
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
                } else {
                    alert("로그인 성공");
                    sessionStorage.setItem("user_id", inputId);
                    document.location.href = "/main";
                }
            })
            .catch();
    };

    function checkAll() {
        if (!CheckUserId(inputId)) {
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
            return false;
        }
        return true; //확인이 완료되었을 때
    }

    function CheckPassword(id, password1) {
        //비밀번호가 입력되었는지 확인하기
        if (!checkExistData(password1, "비밀번호를")) return false;

        var password1RegExp = /^[a-zA-z0-9]{2,16}$/; //비밀번호 유효성 검사
        if (!password1RegExp.test(password1)) {
            alert(
                "비밀번호는 영문 대소문자와 숫자 2 ~ 16자리로 입력해야합니다!"
            );
            inputIdRef.current.value = "";
            inputPwRef.current.value = "";
            return false;
        }

        LoginCheck(); //확인이 완료되었을 때
    }

    /*/// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/user_inform/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])*/

    return (
        <body class="text-center">
            <main class="form-signin w-100 m-auto">
                <form action="/login" method="post">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-person-check"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path
                            fill-rule="evenodd"
                            d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                    </svg>
                    <h1 class="h3 mb-3 fw-normal">로그인</h1>
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

                    <button
                        class="w-100 btn btn-lg btn-primary"
                        type="button"
                        onClick={checkAll}
                    >
                        Log in
                    </button>
                </form>
            </main>
        </body>
    );
}

export default Login;
