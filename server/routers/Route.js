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
    const sqlGet = `SELECT \`ROUTE ID\`, \`STATION NAME\`, \`ORDER\`,  ROUTE.\`STATION CODE\`
                    FROM ROUTE, \`PICKUP POINT\`
                    WHERE ROUTE.\`STATION CODE\` = \`PICKUP POINT\`.\`STATION CODE\`
                    ORDER BY \`ROUTE ID\`, \`ORDER\``
                    ;

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    const route_id = req.body.route_id;
    const station_code = req.body.station_code;
    const order = req.body.order;

    const sqlInsert = "INSERT INTO ROUTE VALUES (?, ?, ?)";
    db.query(sqlInsert, [route_id, station_code, order], (err, result) => {
        if (err) console.log(err);
        else console.log("Insert successful");
    });
});

router.delete(`/delete/:route_id/:station_code/:order`, (req, res) => {
    const { route_id, station_code, order } = req.params;

    const sqlDelete = "DELETE FROM ROUTE WHERE `ROUTE ID` = ? AND `STATION CODE` = ? AND `ORDER` = ?"
    db.query(sqlDelete, [route_id, station_code, order], (err, result) => {
        if (err) console.log(err);
        else console.log("Deleted!");
    })
});

export default router;