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
    const sqlGet = "SELECT * FROM `SINGLE TICKET`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const type = req.body.type;
    const route_id = req.body.route_id;
    const price = req.body.price;

    const sqlInsert = "INSERT INTO `SINGLE TICKET` VALUES (?, ?, ?)";
    db.query(sqlInsert, [type, route_id, price], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:type/:route_id`, (req, res) => {
    const { type, route_id } = req.params;

    const sqlDelete = "DELETE FROM `SINGLE TICKET` WHERE TYPE = ? AND `ROUTE ID` = ?"
    db.query(sqlDelete, [type, route_id], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:type/:route_id`, (req, res) => {
    const { type, route_id } = req.params;
    const price = req.body.price;

    const sqlEdit = "UPDATE `SINGLE TICKET` SET PRICE = ? WHERE `TYPE` = ? AND `ROUTE ID` = ? "
    db.query(sqlEdit, [price, type, route_id], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;