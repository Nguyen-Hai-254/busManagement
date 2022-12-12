import { add } from "date-fns";
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
    const sqlGet = "SELECT * FROM CLIENT";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const ID = req.body.ID;
    const name = req.body.name;
    const DOB = req.body.DOB;
    const address = req.body.address;

    const sqlInsert = "INSERT INTO CLIENT VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [ID, name, DOB, address], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:ID`, (req, res) => {
    const { ID } = req.params;

    const sqlDelete = "DELETE FROM CLIENT WHERE ID = ?"
    db.query(sqlDelete, [ID], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:ID`, (req, res) => {
    const { ID } = req.params;
    const { name, DOB, address } = req.body;

    const sqlEdit = "UPDATE CLIENT SET NAME = ?, DOB = ?, ADDRESS = ? WHERE ID = ?"
    db.query(sqlEdit, [name, DOB, address, ID], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;