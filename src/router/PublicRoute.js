import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, isAuthenticated }) => {
  return (
    <Route
      component={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
