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
import Monthly_Ticket from "./routers/Monthly_ticket.js";
import DAT_Monthly_Ticket from "./routers/DAT_monthly_ticket.js";
import Monthly_Ticket_Salesman from "./routers/Monthy_ticket_salesman.js";
import Sold_Monthly_Ticket from "./routers/Sold_monthly_ticket.js";
import Client from "./routers/Client.js";
import PhoneClient from "./routers/PhoneClient.js";
import Bus from "./routers/Bus.js";
import WorksOn from "./routers/WorksOn.js";
import Employee from './routers/Employee.js'
import Coordinator from './routers/Coordinator.js'
import Driver from './routers/Driver.js'
import AssistanDriver from './routers/AssistanDriver.js'


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
app.use('/Monthly_ticket', Monthly_Ticket);
app.use('/DAT_monthly_ticket', DAT_Monthly_Ticket);
app.use('/Monthly__ticket_salesman', Monthly_Ticket_Salesman);
app.use('/Sold_monthly_ticket', Sold_Monthly_Ticket);
app.use('/Client', Client);
app.use('/PhoneClient', PhoneClient);
app.use('/Bus', Bus);
app.use('/works_on', WorksOn);

//----------Phong------------
app.use('/Employee', Employee);
app.use('/Coordinator', Coordinator);
app.use('/driver', Driver);
app.use('/assistandriver', AssistanDriver);

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(3001, () => {
    console.log("running on port 3001");
})