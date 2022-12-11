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
    const sqlGet = "SELECT * FROM `DAT_MONTHLY_TICKET`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const ticketcode = req.body.ticketcode;
    const date = req.body.date;
    const time = req.body.time;

    const dat = date + ' ' + time;   

    const sqlInsert = "INSERT INTO `DAT_MONTHLY_TICKET` VALUES (?, ?)";
    db.query(sqlInsert, [ticketcode, dat], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:ticketcode/:dateAndTime/`, (req, res) => {
    const { ticketcode, dateAndTime } = req.params;

    const sqlDelete = "DELETE FROM `DAT_MONTHLY_TICKET` WHERE `TICKETCODE` = ? AND `DATE AND TIME` = ?"
    db.query(sqlDelete, [ticketcode, dateAndTime], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

export default router;