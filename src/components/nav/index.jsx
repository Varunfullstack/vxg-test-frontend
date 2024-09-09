import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
// components
import NavSection from "../nav-section/NavSection";
import navConfig from "./config";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <NavSection data={navConfig()} />
    </>
  );

  return (
    <Box
      component="nav"
      style={{ marginTop: "64px" }}
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: "200px" },
        mt: "64px",
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: { lg: "200px" },
            bgcolor: "background.default",
            borderRightStyle: "dashed",
            top: "64px",
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
