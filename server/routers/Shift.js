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
    const sqlGet = "SELECT * FROM SHIFT ORDER BY `START TIME`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const No = req.body.No;
    const start_time = req.body.start_time;
    const finish_time = req.body.finish_time;

    const sqlInsert = "INSERT INTO SHIFT VALUES (?, ?, ?)";
    db.query(sqlInsert, [No, start_time, finish_time], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:No`, (req, res) => {
    const { No } = req.params;

    const sqlDelete = "DELETE FROM SHIFT WHERE No = ?"
    db.query(sqlDelete, [No], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:No`, (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const { No } = req.params;
    const {start_time, finish_time} = req.body;
    console.log(No);
    console.log(start_time);
    console.log(finish_time);

    const sqlEdit = "UPDATE SHIFT SET `START TIME` = ?, `FINISH TIME` = ? WHERE No = ?"
    db.query(sqlEdit, [start_time, finish_time, No], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;