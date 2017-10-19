// React library
import React from 'react';
// Import Router
import { Route } from 'react-router';

// Import components
import App from '../components/Application/Application.jsx';
import BookModal from '../components/BookModal/BookModal.jsx';

import appConfig from '../../../appConfig';

// Routes we need
const routes = {
  client: (
    <Route>
      <Route path={`${appConfig.baseAnnualUrl}:type`} component={App}>
        <Route path={`${appConfig.baseAnnualUrl}:type/:year`}>
          <Route path={`${appConfig.baseAnnualUrl}:type/:year/:id`} component={BookModal} />
        </Route>
      </Route>
      <Route path={appConfig.baseMonthUrl} component={App}>
        <Route path={`${appConfig.baseMonthUrl}:month`}>
          <Route path={`${appConfig.baseMonthUrl}:month/:id`} component={BookModal} />
        </Route>
      </Route>
    </Route>
  ),
  server: (
    <Route>
      <Route path={`${appConfig.baseAnnualUrl}:type`} component={App}>
        <Route path={`${appConfig.baseAnnualUrl}:type/:year`}>
          <Route path={`${appConfig.baseAnnualUrl}:type/:year/:id`} component={BookModal} />
        </Route>
      </Route>
      <Route path={appConfig.baseMonthUrl} component={App}>
        <Route path={`${appConfig.baseMonthUrl}:month`}>
          <Route path={`${appConfig.baseMonthUrl}:month/:id`} component={BookModal} />
        </Route>
      </Route>
    </Route>
  ),
};

export default routes;
