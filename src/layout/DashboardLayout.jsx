import { useState } from "react";
import { Outlet } from "react-router-dom";
// // @mui
// //
import Header from "../components/header";
import NavBar from "../components/nav/index";
// import { Box } from "@mui/material";

import { AppBar, Box, Toolbar } from "@mui/material";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const NAV_WIDTH = 280;

  return (
    <Box sx={{ display: "flex", width: "100vw", overflow: "hidden" }}>
      <AppBar position="fixed" sx={{ zIndex: 1 }}>
        <Toolbar>
          <Header onOpenNav={() => setOpen(true)} />
        </Toolbar>
      </AppBar>

      <NavBar openNav={open} onCloseNav={() => setOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
          width: { sm: `calc(100% - ${NAV_WIDTH}px)` },
          minHeight: "60vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
