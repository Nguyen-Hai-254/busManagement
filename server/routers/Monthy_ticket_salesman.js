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
    const sqlGet = "SELECT * FROM `MONTHLY TICKET SALESMAN`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const ID_MTS = req.body.ID_MTS;
    const branch = req.body.branch;

    const sqlInsert = "INSERT INTO `MONTHLY TICKET SALESMAN` VALUES (?, ?)";
    db.query(sqlInsert, [ID_MTS, branch], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:ID_MTS`, (req, res) => {
    const { ID_MTS } = req.params;

    const sqlDelete = "DELETE FROM `MONTHLY TICKET SALESMAN` WHERE `ID MTS` = ?"
    db.query(sqlDelete, [ID_MTS], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:ID_MTS`, (req, res) => {
    const { ID_MTS } = req.params;
    const branch = req.body.branch;

    const sqlEdit = "UPDATE `MONTHLY TICKET SALESMAN` SET BRANCH = ? WHERE `ID MTS` = ?"
    db.query(sqlEdit, [branch, ID_MTS], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;