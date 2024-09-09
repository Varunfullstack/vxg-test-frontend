// layouts
// import Layout from "./layout/Layout";
import DashboardLayout from "./layout/DashboardLayout";
import SimpleLayout from "./layout/SimpleLayout";
// pages
import Dealers from "./page/Dealers";
import Customers from "./page/Customers";
import Dashboard from "./page/Dashboard";
import NotFound from "./page/NotFound";
import LoginPage from "./page/LoginPage";

// ----------------------------------------------------------------------

export const routesData = [
  {
    path: "/",
    layout: SimpleLayout,
    routes: [{ path: "", component: LoginPage }],
    isProtected: false,
  },
  {
    path: "/",
    layout: DashboardLayout,
    routes: [
      {
        path: "/dealers",
        component: Dealers,
        permission: "admin",
      },
      {
        path: "customers",
        component: Customers,
        permission: "dealer",
      },
      {
        path: "dashboard",
        component: Dashboard,
        permission: "customer",
      },

      { path: "*", component: NotFound },
    ],
    isProtected: true,
  },
];
