import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Components
import Alerts from "./containers/Alerts";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Profile from "./containers/Profile";
import ProfileUpdate from "./containers/ProfileUpdate";

const routes = () => {
  return (
    <div className="container">
      <Alerts />
      <Switch>
        <PrivateRoute exact path="/" component={Profile} />
        <PrivateRoute exact path="/update-profile" component={ProfileUpdate} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

export default routes;
