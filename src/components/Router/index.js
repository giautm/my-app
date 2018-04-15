import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Exception from 'components/Exception';
//import ScopeRoute from 'components/ScopeRoute';
import HomePage from 'containers/HomePage';

import GoogleMap from 'containers/GoogleMap';

const Router = (props) => (
  <Switch>
    <Route exact path="/homepage" component={HomePage} />
    <Route exact path="/maps/transporters" component={GoogleMap} />
    <Route
      path="*"
      component={() => (
        <Exception
          type="404"
          style={{ minHeight: 500, height: '80%' }}
        />
      )}
    />
  </Switch>
);

export default Router;
