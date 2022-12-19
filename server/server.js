const express = require("express");
const app = express();
app.set("port", process.env.PORT || 9000);

const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "./instantclient_21_7" });
oracledb.autoCommit = true;

const dotenv = require("dotenv");
dotenv.config();

var options = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DATABASE,
};

async function createDatabase() {
    let connection = await oracledb.getConnection(options);

    let result = await connection.execute(
        "INSERT INTO USERS VALUES (20,20,1,60,50)"
    );
    console.log("Rows Insert: " + result.rowsAffected);
}
/*
async function selectDatabase() {
    let connection = await oracledb.getConnection(options);

    let result = await connection.execute(
        "SELECT PASSWORD FROM USERS"
        );
    return result.rows[0][0]
}
*/
var conn
oracledb.getConnection(options, function (err, con) {
    if (err) {
        console.log("접속이 실패했습니다.", err);
        return;
    } conn = con;
});

app.get('/data',(req,res)=>{
    const data = {
        lastname : "kim",
        firstname : "geonhee"
    };
    res.json(data);
})

app.get("/create", (req, res) => {
    createDatabase();
});

app.get("/select", (req, res) => {
    conn.execute("SELECT PASSWORD FROM USERS", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/board", (req, res) => {
    conn.execute("SELECT * FROM BOARD", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
    console.log("server running on PORT", app.get("port"));
});