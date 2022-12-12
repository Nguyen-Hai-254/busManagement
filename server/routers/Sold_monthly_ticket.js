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
    const sqlGet = "SELECT * FROM `SOLD MONTHLY TICKET`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const id_mts = req.body.id_mts;
    const ID = req.body.ID;
    const buyDate = req.body.buyDate;
    const buyTime = req.body.buyTime;

    const dat = buyDate + ' ' + buyTime;   

    const sqlInsert = "INSERT INTO `SOLD MONTHLY TICKET` VALUES (?, ?, ?)";
    db.query(sqlInsert, [ id_mts, ID, dat], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:id_mts/:ID/:buyDate`, (req, res) => {
    const { id_mts, ID, buyDate } = req.params;

    const sqlDelete = "DELETE FROM `SOLD MONTHLY TICKET` WHERE `ID MTS` = ? AND ID = ? AND `BUY DATE` = ?"
    db.query(sqlDelete, [id_mts, ID, buyDate], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

export default router;