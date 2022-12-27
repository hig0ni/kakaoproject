const express = require("express");
const app = express();
const user_inform = require("./routes/user_inform");
app.use("/user_inform", user_inform);

app.set("port", 9000);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
    console.log("server running on PORT", app.get("port"));
});

/*
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "./instantclient_21_7" });
oracledb.autoCommit = true;

var conn
oracledb.getConnection(options, function (err, con) {
    if (err) {
        console.log("접속이 실패했습니다.", err);
        return;
    } conn = con;
});
*/

/*
async function createDatabase() {
    let connection = await oracledb.getConnection(options);

    let result = await connection.execute(
        "INSERT INTO USERS VALUES (20,20,1,60,50)"
    );
    console.log("Rows Insert: " + result.rowsAffected);
}

async function selectDatabase() {
    let connection = await oracledb.getConnection(options);

    let result = await connection.execute(
        "SELECT PASSWORD FROM USERS"
        );
    return result.rows[0][0]
}

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

app.get("/users", (req, res) => {
    conn.execute("SELECT USERID FROM USERS", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
*/
