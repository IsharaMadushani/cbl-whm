import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import routes from "./routes";


export const RoutesSwitcher = (
    <Switch>
      {routes.map((prop, key) => {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      })}
      <Redirect from="/" to="/signin" />
    </Switch>
);


export default routes;