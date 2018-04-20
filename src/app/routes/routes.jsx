// React library
import React from 'react';
// Import Router
import { IndexRoute, Route, Redirect } from 'react-router';

// Import component
import App from '../components/Application/Application.jsx';
import Main from '../components/Application/Main.jsx';
import BookPage from '../components/BookPage/BookPage.jsx';
// import StaffPicks from '../components/StaffPicks/StaffPicks.jsx';
import Error404Page from '../components/Error404Page/Error404Page.jsx';

import appConfig from '../../../appConfig';

// Routes we need
const routes = {
  client: (
    <Route path={`${appConfig.baseUrl}`} component={App}>
      <IndexRoute component={Main} />
      {/*<Route path="/books-music-movies/recommendations/best-books/staff-picks/" component={StaffPicks} />*/}
      {/*<Route path={`${appConfig.baseMonthUrl}:month`} component={StaffPicks} />*/}
      {/*<Route path={`${appConfig.baseMonthUrl}:month/:id`} component={BookPage} />*/}
      <Route path={`${appConfig.baseUrl}404`} component={Error404Page} />
      <Route path={`${appConfig.baseUrl}:type`} component={Main} />
      <Route path={`${appConfig.baseUrl}:type/:year`} component={Main} />
      <Route path={`${appConfig.baseUrl}:type/:year/:id`} component={BookPage} />
      <Redirect from="*" to={`${appConfig.baseUrl}`} />
    </Route>
  ),
};

export default routes;
