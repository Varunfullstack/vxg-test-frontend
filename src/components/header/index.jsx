import PropTypes from "prop-types";
// @mui
import { Stack, Button, Typography } from "@mui/material";

import { doSignOut } from "../../firebase/auth";

export default function Header() {
  const token = localStorage.getItem("accessToken");
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        width={"100%"}
        justifyContent="space-between"
        sx={{ backdropFilter: "blur(6px)" }}
        spacing={{
          xs: 0.5,
          sm: 1,
        }}
      >
        <Typography variant="body1">Welcome, User</Typography>

        {token && (
          <Button color="inherit" onClick={doSignOut}>
            Log Out
          </Button>
        )}
      </Stack>
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
