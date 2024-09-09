import { Dashboard } from "@mui/icons-material";

const NavConfig = () => {
  return [
    {
      title: "Dealers",
      path: "//dealers",
      icon: <Dashboard />,
      permission: "admin",
    },
    {
      title: "Customers",
      path: "/customers",
      icon: <Dashboard />,
      permission: "dealer",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard />,
      permission: "customer",
    },
  ].filter(Boolean);
};

export default NavConfig;
