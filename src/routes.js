/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
//import LibraryBooks from "@material-ui/icons/LibraryBooks";
//import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
//import Homepage from "./view/Homepage/homepage";
import UserProfile from "./view/Profile/profile";
import ListApart from "./view/ListApart/ListApart.js"
import UserAccount from "./view/UserAccount/UserAccount";
import AdminAccount from "./view/AdminAccount/AdminAccount";
import Bill from "./view/Bill/Bill.js";
//import NotificationsPage from "views/Notifications/Notifications.js";
// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/home",
    name: "Quản lý căn hộ",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: ListApart,
    layout: ""
  },
  {
    path: "/admin_account",
    name: "Quản lý hóa đơn",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:Bill ,
    layout: ""
  },
  {
    path: "/profile",
    name: "Thông tin tài khoản",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:UserProfile,
    layout: ""
  },
  {
    path: "/user_account",
    name: "Quản lý người dùng",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:UserAccount ,
    layout: ""
  },
  {
    path: "/admin_account",
    name: "Quản lý admin",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:AdminAccount ,
    layout: ""
  },

  
  // {
  //   path: "/notifications",
  //   name: "Gửi thông báo",
  //   rtlName: "إخطارات",
  //   //icon: Notifications,
  //   //component: NotificationsPage,
  //   layout: "/admin"
  // },
  
];

export default dashboardRoutes;
