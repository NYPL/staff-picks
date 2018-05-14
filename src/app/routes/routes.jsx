// React library
import React from 'react';
// Import Router
import { IndexRoute, Router, Route, Redirect } from 'react-router';

// Import components
import App from '../components/Application/Application';
import Main from '../components/Application/Main';
import Error404Page from '../components/Error404Page/Error404Page';

import appConfig from '../../../appConfig';

// Routes we need
const routes = {
  client: (
    <Router>
      <Route path={`${appConfig.baseUrl}`} component={App}>
        <IndexRoute component={Main} />
        <Route path={`${appConfig.baseUrl}staff-picks`} component={Main} />
        <Route path={`${appConfig.baseUrl}childrens`} component={Main} />
        <Route path={`${appConfig.baseUrl}ya`} component={Main} />
        <Route path="*" status={404} component={Error404Page} />
      </Route>
    </Router>
  ),
};

export default routes;
