const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "",
    database: "assignment",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/in_route/get", (req, res) => {
    const sqlGet = "SELECT * FROM `IN ROUTE`";

    db.query(sqlGet, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get("/api/pickup_point/get", (req, res) => {
    const sqlGet = "SELECT * FROM `PICKUP POINT`";

    db.query(sqlGet, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO `IN ROUTE` VALUES ('123', 23, 'V', '12')";
    // db.query(sqlInsert, (err, result) => {
    //     console.log(result);
    // });
    res.send("Hello");
})

app.listen(3001, () => {
    console.log("running on port 3001");
})