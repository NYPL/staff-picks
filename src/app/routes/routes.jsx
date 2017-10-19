// React library
import React from 'react';
// Import Router
import { IndexRoute, Route, Redirect } from 'react-router';

// Import components
import App from '../components/Application/Application.jsx';
import Main from '../components/Application/Main.jsx';
import BookPage from '../components/BookPage/BookPage.jsx';

import appConfig from '../../../appConfig';

// Routes we need
const routes = {
  client: (
    <Route>
      <Route path={`${appConfig.baseAnnualUrl}:type`} component={App}>
        <IndexRoute component={Main} />
        <Route path={`${appConfig.baseAnnualUrl}:type/:year`} component={Main} />
        <Route path={`${appConfig.baseAnnualUrl}:type/:year/:id`} component={BookPage} />
        <Redirect from="*" to={appConfig.baseMonthUrl} />
      </Route>
      <Route path={appConfig.baseMonthUrl} component={App}>
        <IndexRoute component={Main} />
        <Route path={`${appConfig.baseMonthUrl}:month`} component={Main} />
        <Route path={`${appConfig.baseMonthUrl}:month/:id`} component={BookPage} />
        <Redirect from="*" to={appConfig.baseMonthUrl} />
      </Route>
    </Route>
  ),
  server: (
    <Route>
      <Route path={`${appConfig.baseAnnualUrl}:type`} component={App}>
        <IndexRoute component={Main} />
        <Route path={`${appConfig.baseAnnualUrl}:type/:year`} component={Main} />
        <Route path={`${appConfig.baseAnnualUrl}:type/:year/:id`} component={BookPage} />
      </Route>
      <Route path={appConfig.baseMonthUrl} component={App}>
        <IndexRoute component={Main} />
        <Route path={`${appConfig.baseMonthUrl}:month`} component={Main} />
        <Route path={`${appConfig.baseMonthUrl}:month/:id`} component={BookPage} />
      </Route>
    </Route>
  ),
};

export default routes;
