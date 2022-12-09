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
    const sqlGet = "SELECT * FROM `IN ROUTE`";

    db.query(sqlGet, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const license_plate = req.body.license_plate;
    const route_id = req.body.route_id;
    const movement_direction = req.body.movement_direction;
    const No = req.body.No;

    const sqlInsert = "INSERT INTO `IN ROUTE` VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [license_plate, route_id, movement_direction, No], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:route_id/:movement_direction/:No`, (req, res) => {
    const { route_id, movement_direction, No } = req.params;

    const sqlDelete = "DELETE FROM `IN ROUTE` WHERE `ROUTE ID` = ? AND `MOVEMENT DIRECTION` = ? AND No = ?"
    db.query(sqlDelete, [route_id, movement_direction, No], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:route_id/:movement_direction/:No`, (req, res) => {
    const { route_id, movement_direction, No } = req.params;
    const license_plate = req.body.license_plate;

    const sqlEdit = "UPDATE `IN ROUTE` SET `LICENSE PLATE` = ? WHERE `ROUTE ID` = ? AND `MOVEMENT DIRECTION` = ? AND No = ?"
    db.query(sqlEdit, [license_plate, route_id, movement_direction, No], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;