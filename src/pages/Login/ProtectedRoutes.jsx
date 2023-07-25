import PropTypes from "prop-types";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuth }) => {
  const isLoggedIn = isAuth;
  const { pathname: currentPath } = useLocation();

  return !isLoggedIn ? (
    <Navigate to="/auth" state={currentPath} replace />
  ) : (
    <Outlet />
  );
};

ProtectedRoute.propTypes = {
  isAuth: PropTypes.any,
};

export default ProtectedRoute;
