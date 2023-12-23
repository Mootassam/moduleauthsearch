import PermissionChecker from "@modules/auth/permissionChecker";
import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { tenantSubdomain } from "@modules/tenant/tenantSubdomain";

function PrivateRoute({
  component: Component,
  currentTenant,
  currentUser,
  permissionRequired,
  ...rest
}) {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        const permissionChecker = new PermissionChecker(
          currentTenant,
          currentUser
        );

        if (!permissionChecker.isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: "/auth/signin",
                state: { from: location },
              }}
            />
          );
        }

        if (permissionChecker.isAuthenticated) {
          if (permissionChecker.isEmptyPermissions) {
            return <Redirect to="/auth/empty-permissions" />;
          } else return <Component {...props} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
