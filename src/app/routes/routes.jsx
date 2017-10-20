// React library
import React from 'react';
// Import Router
import { IndexRoute, Route, Redirect } from 'react-router';

// Import components
import App from '../components/Application/Application.jsx';
import Main from '../components/Application/Main.jsx';
import BookPage from '../components/BookPage/BookPage.jsx';
import Error404Page from '../components/Error404Page/Error404Page.jsx';

import appConfig from '../../../appConfig';

// Routes we need
const routes = {
  client: (
    <Route path="/books-music-dvds/recommendations/" component={App}>
      <IndexRoute component={Main} />
      <Route path={`${appConfig.baseAnnualUrl}:type`} component={Main} />
      <Route path={`${appConfig.baseAnnualUrl}:type/:year`} component={Main} />
      <Route path={`${appConfig.baseAnnualUrl}:type/:year/:id`} component={BookPage} />
      <Route path={`${appConfig.baseMonthUrl}`} component={Main} />
      <Route path={`${appConfig.baseMonthUrl}:month`} component={Main} />
      <Route path={`${appConfig.baseMonthUrl}:month/:id`} component={BookPage} />
      <Route path="/books-music-dvds/recommendations/404" component={Error404Page} />
      <Redirect from="*" to="/books-music-dvds/recommendations/404" />
    </Route>
  ),
};

export default routes;
