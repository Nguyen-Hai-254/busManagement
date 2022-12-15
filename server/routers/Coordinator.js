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
    const sqlGet = "SELECT ID_C, ID, FNAME, LNAME, SALARY FROM employee inner join coordinator on employee.ID = coordinator.ID_C";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const id = req.body.id;
    const sqlInsert = "INSERT INTO COORDINATOR VALUES (?)";
    db.query(sqlInsert, [id], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:id`, (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM COORDINATOR WHERE `ID_C` = ?"
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

export default router;