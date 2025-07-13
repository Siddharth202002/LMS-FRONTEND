import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  console.log(role.trim().length);
  console.log(allowedRoles[0].trim().length);

  const hasAccess =
    isLoggedIn &&
    allowedRoles?.some((myRole) => myRole.trim() === role?.trim());

  return hasAccess ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireAuth;
