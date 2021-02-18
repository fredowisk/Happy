import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import { Redirect } from 'react-router-dom';

const SignRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Fazendo com que apenas uma rota seja exibida em tela, usando o Switch */}
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Redirect to="/signin" />
      </Switch>
    </BrowserRouter>
  );
};

export default SignRoutes;
