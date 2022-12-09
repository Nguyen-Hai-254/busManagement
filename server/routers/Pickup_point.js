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
    const sqlGet = "SELECT * FROM `PICKUP POINT`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    try {
        const station_code = req.body.station_code;
        const station_name = req.body.station_name;
        const address = req.body.address;

        const count = "SELECT COUNT(*) FROM `PICKUP POINT`";

        const sqlInsert = "INSERT INTO `PICKUP POINT` VALUES (?, ?, ?)";
        db.query(sqlInsert, [station_code, station_name, address], (err, result) => {
            if (err)
                console.log(err);
            else{
                console.log('Insert successful');
                res.status(200).json();
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }

});

router.delete(`/delete/:station_code`, (req, res) => {
    const station_code = req.params.station_code;

    const sqlDelete = "DELETE FROM `PICKUP POINT` WHERE `STATION CODE` = ?"
    db.query(sqlDelete, [station_code], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:station_code`, (req, res) => {
    const station_code = req.params.station_code;
    const station_name = req.body.station_name;
    const address = req.body.address;

    const sqlEdit = "UPDATE `PICKUP POINT` SET `STATION NAME` = ?, ADDRESS = ? WHERE `STATION CODE` = ?"
    db.query(sqlEdit, [station_name, address, station_code], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;