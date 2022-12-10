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
    const sqlGet = "SELECT * FROM `MONTHLY TICKET`";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const ticketcode = req.body.ticketCode;
    const route_id = req.body.route_id;
    const price = req.body.price;
    const register_date = req.body.register_date;
    const expire_date = req.body.expire_date;
    const ID = req.body.ID;

    const sqlInsert = "INSERT INTO `MONTHLY TICKET` VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [ticketcode, route_id, price, register_date, expire_date, ID], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:ticketcode`, (req, res) => {
    const { ticketcode } = req.params;

    const sqlDelete = "DELETE FROM `MONTHLY TICKET` WHERE TICKETCODE = ? "
    db.query(sqlDelete, [ticketcode], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

router.put(`/edit/:ticketcode`, (req, res) => {
    const { ticketcode } = req.params;
    const { route_id, price, register_date, expire_date, ID } = req.body;

    const sqlEdit = "UPDATE `MONTHLY TICKET` SET `ROUTE ID` = ?, PRICE = ?, `REGISTER DATE` = ?, `EXPIRE DATE` = ?, ID = ? WHERE ticketcode = ?"
    db.query(sqlEdit, [route_id, price, register_date, expire_date, ID, ticketcode], (err, result) => {
        if (err) console.log(err);
        else console.log("Edit Successful!");
    })
});

export default router;