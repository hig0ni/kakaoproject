function Home() {
    const onLogin = () => {
        // login 으로 이동
        document.location.href = '/login'
    }
    const onRegister = () => {
        // login 으로 이동
        document.location.href = '/register'
    }

    return(
        <div>
            <div>
                <h1>안녕하세요</h1>
            </div>
            <div>
                <button type='button' onClick={onLogin}>로그인</button>
                <button type='button' onClick={onRegister}>회원가입</button>
            </div>
        </div>
    )
}
 
export default Home;