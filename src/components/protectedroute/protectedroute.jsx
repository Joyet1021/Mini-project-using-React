import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, role, users, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && (role === "user" || role === "admin") ? (
          <Component {...props} users={users} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
