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
    const sqlGet = "SELECT * FROM `PHONE CLIENT`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const ID = req.body.ID;
    const phone = req.body.phone;

    const sqlInsert = "INSERT INTO `PHONE CLIENT` VALUES (?, ?)";
    db.query(sqlInsert, [ID, phone], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:ID/:phone`, (req, res) => {
    const { ID, phone } = req.params;

    const sqlDelete = "DELETE FROM `PHONE CLIENT` WHERE ID = ? AND PHONE = ?"
    db.query(sqlDelete, [ID, phone], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

export default router;