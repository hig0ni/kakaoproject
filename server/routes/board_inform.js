const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

var options = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DATABASE,
};

const oracledb = require("oracledb");
oracledb.autoCommit = true;

router.post("/onWrite", (req, res) => {
    // title, content 변수로 선언
    const title = req.query.title;
    const content = req.query.content;
    const nickname = req.query.nickname;
    console.log(title);
    console.log(content);
    console.log(nickname);

    oracledb.getConnection(options, (err, connection) => {
        if (err) {
            console.error(err.message);
            return;
        }
        var sql7 = `INSERT INTO BOARD VALUES((SELECT NVL(MAX(POSTNUM),0)+1 FROM BOARD),'${title}','${content}','${nickname}',SYSDATE,0,1,(SELECT NVL(MAX(BOARDINDEX),0)+1 FROM BOARD),SYSDATE)`;
        connection.execute(sql7, (err, result) => {
            if (err) {
                alert("게시글 등록 실패");
            } else {
                res.json({
                    boardWriteStatusCode: 0,
                    msg: "boardWrite COMPLETE"
                });
            }
        })
    })
})

router.get("/getBoard", (req,res)=>{
    oracledb.getConnection(options, (err, connection) => {
        if (err) {
            console.error(err.message);
            return;
        }
        var sql8 = `SELECT * From BOARD ORDER BY POSTNUM`
        connection.execute(sql8, (err, result) => {
            if(err){
                alert("게시글 가져오기 실패");
            } else {
                res.json(result.rows);
            }
        })
    })

})

module.exports = router;
