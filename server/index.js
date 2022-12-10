import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from 'cors';
import Pickup_point from "./routers/Pickup_point.js";
import In_Route from "./routers/In_route.js";
import Router from "./routers/Route.js";
import Bus_Route from "./routers/Bus_route.js";
import Shift from "./routers/Shift.js";
import Single_Ticket from "./routers/Single_ticket.js";
import Provide_Single_Ticket from "./routers/Provide_single_ticket.js";


const app = express();
const db = mysql.createPool({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "",
    database: "assignment",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/Pickup_point', Pickup_point);
app.use('/In_route', In_Route);
app.use('/route', Router);
app.use('/Bus_Route', Bus_Route);
app.use('/Shift', Shift);
app.use('/Single_ticket', Single_Ticket);
app.use('/Provide_single_ticket', Provide_Single_Ticket);


app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(3001, () => {
    console.log("running on port 3001");
})