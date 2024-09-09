import PropTypes from "prop-types";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// @mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ProtectedComponent from "../protected/ProtectedComponent";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const navigate = useNavigate();
  const handleParentClick = (path) => () => navigate(path);
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <ProtectedComponent
            permission={item.permission}
            key={item?.title}
            hide={item?.hide}
          >
            {item.children ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  onClick={handleParentClick(item?.path)}
                >
                  <NavItem key={item.title} item={item} />
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {item.children.map((item) => (
                      <NavItem key={item.title} item={item} />
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <NavItem key={item.title} item={item} />
            )}
          </ProtectedComponent>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

export function NavItem({ item }) {
  const { title, path, icon, info } = item;
  const navItemProps = path
    ? {
        component: RouterLink,
        to: path,
      }
    : {};

  return (
    <ListItem
      {...navItemProps}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
      button
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
      {info}
    </ListItem>
  );
}
