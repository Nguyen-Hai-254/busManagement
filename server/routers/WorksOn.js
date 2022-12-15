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
    const sqlGet = "SELECT * FROM WORKS_ON";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const id_driver = req.body.id_driver;
    const license_plate = req.body.license_plate;
    const ID_AD = req.body.ID_AD;

    const sqlInsert = "INSERT INTO WORKS_ON VALUES (?, ?, ?)";
    db.query(sqlInsert, [id_driver, license_plate, ID_AD], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:id_driver/:license_plate`, (req, res) => {
    const { id_driver, license_plate } = req.params;

    const sqlDelete = "DELETE FROM WORKS_ON WHERE `ID_DRIVER` = ? AND `LICENSE PLATE` = ?"
    db.query(sqlDelete, [id_driver, license_plate], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:id_driver/:license_plate`, (req, res) => {
    const { id_driver, license_plate } = req.params;
    const ID_AD = req.body.ID_AD;

    const sqlEdit = "UPDATE WORKS_ON SET `ID_AD` = ? WHERE `ID_DRIVER` = ? AND `LICENSE PLATE` = ?"
    db.query(sqlEdit, [ID_AD, id_driver, license_plate], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;