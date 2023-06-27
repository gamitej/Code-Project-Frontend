import PropTypes from "prop-types";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuth }) => {
  const isLoggedIn = isAuth;
  return !isLoggedIn ? <Navigate to="/auth" replace /> : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAuth: PropTypes.any,
};

export default ProtectedRoute;
