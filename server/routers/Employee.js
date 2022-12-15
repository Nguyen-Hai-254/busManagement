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
    const sqlGet = "SELECT * FROM `EMPLOYEE`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const id = req.body.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const dob = req.body.dob;
    const startDate = req.body.startDate;
    const salary = req.body.salary;

    const sqlInsert = "INSERT INTO EMPLOYEE VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [id, fname, lname, dob, startDate, salary], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:route_id`, (req, res) => {
    const route_id = req.params.route_id;

    const sqlDelete = "DELETE FROM EMPLOYEE WHERE `ID` = ?"
    db.query(sqlDelete, [route_id], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:route_id`, (req, res) => {
    const {route_id} = req.params;
    const {idEdit,fnameEdit,lnameEdit,dobEdit,startDateEdit,salaryEdit} = req.body;
    const sqlEdit = "UPDATE `EMPLOYEE` SET FNAME = ?, LNAME = ?, DOB = ?, `START DATE` = ?, SALARY = ? WHERE ID = ?"
    db.query(sqlEdit, [fnameEdit, lnameEdit, dobEdit, startDateEdit, salaryEdit, idEdit], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;