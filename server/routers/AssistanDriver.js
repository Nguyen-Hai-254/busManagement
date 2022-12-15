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
    const sqlGet = "SELECT ID_AD, ID, FNAME, LNAME, SALARY FROM employee inner join `assistant driver` on employee.ID = `assistant driver`.ID_AD";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const id = req.body.id;
    const sqlInsert = "INSERT INTO `assistant driver` VALUES (?)";
    db.query(sqlInsert, [id], (err, result) => {
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
export default router;