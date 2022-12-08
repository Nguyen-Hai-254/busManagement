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

/////////////// IN ROUTE

app.get("/api/in_route/get", (req, res) => {
    const sqlGet = "SELECT * FROM `IN ROUTE`";

    db.query(sqlGet, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

app.post("/api/in_route/insert", (req, res) => {
    const license_plate = req.body.license_plate;
    const route_id = req.body.route_id;
    const movement_direction = req.body.movement_direction;
    const No = req.body.No;

    const sqlInsert = "INSERT INTO `IN ROUTE` VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [license_plate, route_id, movement_direction, No], (err, result) => {
        console.log(err);
    });
});

app.delete(`/api/in_route/delete/:route_id/:movement_direction/:No`, (req, res) => {
    const {route_id, movement_direction, No} = req.params;

    const sqlDelete = "DELETE FROM `IN ROUTE` WHERE `ROUTE ID` = ? AND `MOVEMENT DIRECTION` = ? AND No = ?"
    db.query(sqlDelete, [route_id, movement_direction, No], (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    })
});



app.get("/api/pickup_point/get", (req, res) => {
    const sqlGet = "SELECT * FROM `PICKUP POINT`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(3001, () => {
    console.log("running on port 3001");
})