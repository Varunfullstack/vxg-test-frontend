/* eslint-disable react-hooks/rules-of-hooks */
// import React from "react";
import { Navigate } from "react-router-dom";
import { checkComponentPermission } from "./utils/checkComponentPermission";
import NotFound from "./page/NotFound";
import { useAuth } from "./contexts/authContext";

// eslint-disable-next-line react/display-name
export const WithAuth = (Component, permission, isProtected) => (props) => {
  const { currentUser } = useAuth();
  // Simulate the authentication check (can replace with actual logic)
  const isAuthenticated = currentUser;

  // If the component is protected and the user isn't authenticated, redirect to login
  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If permission is required and the user doesn't have it, show the NotFound page
  if (permission && !checkComponentPermission(permission)) {
    return <NotFound />;
  }

  // Otherwise, render the component
  return <Component {...props} />;
};
