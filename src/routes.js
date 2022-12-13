/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import In_Route from "views/In_Route";
import Pickup_point from "views/Pickup_point";
import Route from "views/Route";
import Bus_Route from "views/Bus_Route";
import Shift from "views/Shift";
import Single_Ticket from "views/Single_Ticket";
import Provide_Single_Ticket from "views/Provide_Single_Ticket";
import Monthly_Ticket from "views/Monthly_Ticket";
import DAT_Monthly_Ticket from "views/DAT_Monthly_Ticket";
import Monthly_Ticket_Salesman from "views/Monthly_Ticket_Salesman";
import Sold_Monthly_Ticket from "views/Sold_Monthly_Ticket";
import Client from "views/Client";
import PhoneClient from "views/PhoneClient";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/in_route",
    name: "Thuộc tuyến xe",
    icon: "nc-icon nc-bell-55",
    component: In_Route,
    layout: "/admin"
  },
  {
    path: "/pickup_point",
    name: "Điểm đón khách",
    icon: "nc-icon nc-bell-55",
    component: Pickup_point,
    layout: "/admin"
  },
  {
    path: "/route",
    name: "Lộ trình",
    icon: "nc-icon nc-bell-55",
    component: Route,
    layout: "/admin"
  },
  {
    path: "/bus_route",
    name: "Tuyến xe",
    icon: "nc-icon nc-bell-55",
    component: Bus_Route,
    layout: "/admin"
  },
  {
    path: "/shift",
    name: "Ca chạy",
    icon: "nc-icon nc-bell-55",
    component: Shift,
    layout: "/admin"
  },
  {
    path: "/single_ticket",
    name: "Vé ngày",
    icon: "nc-icon nc-bell-55",
    component: Single_Ticket,
    layout: "/admin"
  },
  {
    path: "/sold_single_ticket",
    name: "Đã bán vé ngày",
    icon: "nc-icon nc-bell-55",
    component: Provide_Single_Ticket,
    layout: "/admin"
  },
  {
    path: "/monthly_ticket",
    name: "Vé tháng",
    icon: "nc-icon nc-bell-55",
    component: Monthly_Ticket,
    layout: "/admin",
  },
  {
    path: "/dat_monthly_ticket",
    name: "Date & Time Monthly Ticket",
    icon: "nc-icon nc-bell-55",
    component: DAT_Monthly_Ticket,
    layout: "/admin"
  },
  {
    path: "/monthly__ticket_salesman",
    name: "Nhân viên bán vé tháng",
    icon: "nc-icon nc-bell-55",
    component: Monthly_Ticket_Salesman,
    layout: "/admin"
  },
  {
    path: "/sold_monthly_ticket",
    name: "Đã bán vé tháng",
    icon: "nc-icon nc-bell-55",
    component: Sold_Monthly_Ticket,
    layout: "/admin"
  },
  {
    path: "/client",
    name: "Khách hàng",
    icon: "nc-icon nc-bell-55",
    component: Client,
    layout: "/admin"
  },
  {
    path: "/phoneclient",
    name: "SĐT khách hàng",
    icon: "nc-icon nc-bell-55",
    component: PhoneClient,
    layout: "/admin"
  }
];

export default dashboardRoutes;
