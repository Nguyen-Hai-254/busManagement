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
    const sqlGet = "SELECT * FROM `PROVIDE SINGLE TICKET` ORDER BY DATE, `ROUTE ID`";

    db.query(sqlGet, (err, result) => {
        // const curr = result.json();
        // console.log(curr);
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const type = req.body.type;
    const route_id = req.body.route_id;
    const license_plate = req.body.license_plate;
    const date = req.body.date;
    const amount = req.body.amount;

    const sqlInsert = "INSERT INTO `PROVIDE SINGLE TICKET` VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [type, route_id, license_plate, date, amount], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:type/:route_id/:license_plate/:date`, (req, res) => {
    const { type, route_id, license_plate, date } = req.params;

    const sqlDelete = "DELETE FROM `PROVIDE SINGLE TICKET` WHERE TYPE = ? AND `ROUTE ID` = ? AND `LICENSE PLATE` = ? AND DATE = ?"
    db.query(sqlDelete, [type, route_id, license_plate, date], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:type/:route_id/:license_plate/:date`, (req, res) => {
    const { type, route_id, license_plate, date } = req.params;
    const amount = req.body.type;

    const sqlEdit = "UPDATE `PROVIDE SINGLE TICKET` SET AMOUNT = ? WHERE TYPE = ? AND `ROUTE ID` = ? AND `LICENSE PLATE` = ? AND DATE = ?"
    db.query(sqlEdit, [type, route_id, license_plate, date], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;