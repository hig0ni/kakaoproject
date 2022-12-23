const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

var options = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DATABASE,
};

const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "./instantclient_21_7" });
oracledb.autoCommit = true;


router.post('/onLogin', (req, res) => {
    // user_id, user_pw 변수로 선언
    const user_id = req.query.user_id
    const user_pw = req.query.user_pw
    // 입력된 id 와 동일한 id 가 oracle 에 있는 지 확인
    oracledb.getConnection(options,(err, connection)=>{
        if (err) {
            console.error(err.message);
            return;
        }
        var sql1 = `SELECT COUNT(*) FROM USERS WHERE USERID = '${user_id}'`;
        connection.execute(sql1, (err, result)=>{
            if(!err) {
                // 결과값이 1보다 작다면(동일한 id 가 없다면)
                if(result.rows[0][0] < 1) {
                    res.json({loginStatusCode : 0, msg : "ID INCORRECT"});
                } else { 
                    // 동일한 id 가 있으면 비밀번호 일치 확인
                    var sql2 = `SELECT COUNT(*) FROM USERS WHERE USERID = '${user_id}' AND PASSWORD = '${user_pw}'`;
                    connection.execute(sql2, (err, result)=>{
                        if(!err){
                            if(result.rows[0][0] < 1) {
                                //console.log("입력하신 비밀번호가 일치하지 않습니다.")
                                res.json({loginStatusCode : 1, msg : "PW INCORRECT"});
                             } else {
                                //console.log("로그인 성공.");
                                var sql3 = `SELECT USERID, PASSWORD FROM USERS WHERE USERID = '${user_id}' AND PASSWORD = '${user_pw}'`;
                                connection.execute(sql3, (err, result)=>{
                                    if(!err){
                                        res.send(result.rows[0])                          
                                    } else {
                                        res.send(err)
                                    }
                                })
                            }
                        }else {
                            res.send(err)
                        }
                    })
                }
            }
        })
    })
})

module.exports = router;