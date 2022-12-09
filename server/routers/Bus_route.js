import express from "express";
import mysql from "mysql";

const db = mysql.createPool({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "",
    database: "assignment",
});

const router = express.Router();


router.get("/get", (req, res) => {
    const sqlGet = "SELECT * FROM `BUS ROUTE`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const route_id = req.body.route_id;
    const break_time = req.body.break_time;

    const sqlInsert = "INSERT INTO `BUS ROUTE` VALUES (?, ?)";
    db.query(sqlInsert, [route_id, break_time], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:route_id`, (req, res) => {
    const route_id = req.params.route_id;

    const sqlDelete = "DELETE FROM `BUS ROUTE` WHERE `ROUTE ID` = ?"
    db.query(sqlDelete, [route_id], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:route_id`, (req, res) => {
    const {route_id} = req.params;
    const break_time = req.body.break_time;

    const sqlEdit = "UPDATE `BUS ROUTE` SET `BREAK TIME` = ? WHERE `ROUTE ID` = ?"
    db.query(sqlEdit, [break_time, route_id], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;