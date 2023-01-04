const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

var options = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DATABASE,
};

const oracledb = require("oracledb");
const { appendFile } = require("fs");
oracledb.initOracleClient({ libDir: "./instantclient_21_7" });
oracledb.autoCommit = true;


//bodyparser 사용, post방식일 때만 사용
//router.use(express.json());

router.post("/onLogin", (req, res) => {
    // user_id, user_pw 변수로 선언
    const user_id = req.query.user_id;
    const user_pw = req.query.user_pw;

    // 입력된 id 와 동일한 id 가 oracle 에 있는 지 확인
    oracledb.getConnection(options, (err, connection) => {
        if (err) {
            console.error(err.message);
            return;
        }
        var sql1 = `SELECT COUNT(*) FROM USERS WHERE USERID = '${user_id}'`;
        connection.execute(sql1, (err, result) => {
            //DB에 아이디가 없을 때
            if (result.rows[0][0] < 1) {
                res.json({ loginStatusCode: 0, msg: "ID INCORRECT" });
            } else {
                //아이디가 맞으면 비밀번호 일치 확인
                var sql2 = `SELECT PASSWORD FROM USERS WHERE USERID = '${user_id}'`;
                connection.execute(sql2, async(err, result) => {
                    const check = await bcrypt.compare(user_pw, result.rows[0][0].trim()) 
                    if (check === true) {
                            res.json({ loginStatusCode: 2, msg: "CORRECT" });
                        } else {
                            //아이디는 맞지만, 비밀번호가 틀렸을 때
                            res.json({ loginStatusCode: 1, msg: "PW INCORRECT" });
                    }
                })
            }
        })
    })
})


router.post("/onRegister", async(req, res) => {
    const user_id = req.query.user_id;
    const user_pw = req.query.user_pw;
    const user_pw2 = req.query.user_pw2;
    const user_Nn = req.query.user_Nn;
    const hashing_pw = await bcrypt.hash(user_pw, 10);
    if (user_id && user_pw && user_pw2 && user_Nn) {
        oracledb.getConnection(options, (err, connection) => {
            if (err) {
                console.error(err.message);
                return;
            }
            sql4 = `SELECT COUNT(*) FROM USERS WHERE USERID = '${user_id}'`;
            connection.execute(sql4, (err, result) => {
                if (result.rows[0][0] <= 0) {
                    // DB에 같은 이름의 회원아이디가 있는지 확인
                    sql5 = `SELECT COUNT(*) FROM USERS WHERE NICKNAME = '${user_Nn}'`;
                    connection.execute(sql5, (err, result) => {
                        if (result.rows[0][0] <= 0) {
                            // DB에 같은 이름의 닉네임이 없는 경우
                            if (user_pw === user_pw2) {
                                //비밀번호가 올바르게 입력된 경우
                                sql6 = `INSERT INTO USERS VALUES('${user_id}','${hashing_pw}',0,'${user_Nn}',1,idIndexSeq.NEXTVAL,SYSDATE)`;
                                connection.execute(sql6, (err, result) => {
                                    res.json({
                                        registerStatusCode: 1,
                                        msg: "REGISTER COMPLETE",
                                    });
                                });
                            } else if (user_pw !== user_pw2) {
                                // 비밀번호가 올바르게 입력되지 않은 경우
                                res.json({
                                    registerStatusCode: 2,
                                    msg: "PASSWORD INCORRECT",
                                });
                            }
                        } else {
                            res.json({
                                registerStatusCode: 4,
                                msg: "NICKNAME EXIST",
                            });
                        }
                    });
                } else {
                    // DB에 같은 이름의 회원아이디가 있는 경우
                    res.json({
                        registerStatusCode: 3,
                        msg: "ID EXIST",
                    });
                }
            });
        });
    } else {
        // 입력되지 않은 정보가 있는 경우
        res.json({ registerStatusCode: 0, msg: "UNENTERED INFORMATION" });
    }
});

module.exports = router;
