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
    const sqlGet = "SELECT * FROM BUS";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const license_plate = req.body.license_plate;
    const type_of_bus = req.body.type_of_bus;
    const r_date = req.body.r_date;
    const m_date = req.body.m_date;

    const sqlInsert = "INSERT INTO BUS VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [license_plate, type_of_bus, r_date, m_date], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:license_plate`, (req, res) => {
    const { license_plate } = req.params;

    const sqlDelete = "DELETE FROM BUS WHERE `LICENSE PLATE` = ?"
    db.query(sqlDelete, [license_plate], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:license_plate`, (req, res) => {
    const { license_plate } = req.params;
    const { type_of_bus, r_date, m_date } = req.body;

    const sqlEdit = "UPDATE BUS SET `TYPE OF BUS` = ?, `REGISTRATION DATE` = ?, `MAINTENANCE TIME` = ? WHERE `LICENSE PLATE` = ?"
    db.query(sqlEdit, [type_of_bus, r_date, m_date, license_plate], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;