import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function SimpleLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Outlet />
    </Box>
  );
}
