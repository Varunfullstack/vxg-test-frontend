import PropTypes from "prop-types";
import { checkComponentPermission } from "../../utils/checkComponentPermission";

function ProtectedComponent({ permission, children, hide = false }) {
  if (permission) {
    const hasPermission = checkComponentPermission(permission);
    return hasPermission && !hide ? children : null;
  }
  return !hide ? children : null;
}

ProtectedComponent.propTypes = {
  permission: PropTypes.string,
  children: PropTypes.node,
  hide: PropTypes.bool,
};

export default ProtectedComponent;
