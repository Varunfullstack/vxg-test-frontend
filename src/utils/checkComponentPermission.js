export const checkComponentPermission = (requiredRole) => {
  // Get the user's role from localStorage
  const userRole = localStorage.getItem("role");

  // Check if user's role exists and has enough permissions
  if (userRole && userRole === requiredRole) {
    return true;
  }

  return false;
};
