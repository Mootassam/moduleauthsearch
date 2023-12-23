import React from "react";
import { Route, Redirect } from "react-router-dom";
import PermissionChecker from "@modules/auth/permissionChecker";

function PublicRoute({ component: Component, currentTenant, currentUser, ...rest }) {
  const permissionChecker = new PermissionChecker(currentTenant, currentUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (permissionChecker.isAuthenticated) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;
