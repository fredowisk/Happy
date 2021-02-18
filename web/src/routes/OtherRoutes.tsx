import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import OrphanagesMap from "../pages/OrphanagesMap";
import Orphanage from "../pages/Orphanage";
import CreateOrphanage from "../pages/CreateOrphanage";
import Dashboard from '../pages/Dashboard';
import PendingRegistrations from '../pages/PendingRegistrations';
import EditOrphanage from '../pages/EditOrphanage';

import { Redirect } from 'react-router-dom';

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pending-registrations" component={PendingRegistrations} />
        <Route path="/edit-orphanage" component={EditOrphanage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default OtherRoutes;
