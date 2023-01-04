const express = require("express");
const app = express();
const user_inform = require("./routes/user_inform");
const board = require("./routes/board_inform");
app.use("/user_inform", user_inform);
app.use("/board_inform", board);

app.set("port", 9000);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
    console.log("server running on PORT", app.get("port"));
});
