import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  // Check if the user is authenticated based on the presence of a token in localStorage

  const token = localStorage.getItem("token");

  // Get the current location
  //   const location = useLocation();

  // If there is no token, redirect to the login page and store the current location
  if (token == null || token=='null') {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default RequireAuth;
