// React libraries
import React from 'react';
// Import Router
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

// Import components
import App from '../components/Application/Application.jsx';
import BookModal from '../components/BookModal/BookModal.jsx';
import Error404Page from '../components/Error404Page/Error404Page.jsx';

// Routes we need
const routes = {
  client: (
    <Route name='home' path='/recommendations/staff-picks/' handler={App} ignoreScrollBehavior>
      <Route name='month' path='/recommendations/staff-picks/:month?/?' ignoreScrollBehavior/>
      <Route name='modal' path='/recommendations/staff-picks/:month/:id?/?' handler={BookModal} ignoreScrollBehavior>
        <NotFoundRoute handler={Error404Page} />
      </Route>
    </Route>
  ),
  server: (
    <Route name='home' path='/' handler={App} ignoreScrollBehavior>
      <Route name='month' path='/:month?/?' ignoreScrollBehavior/>
      <Route name='modal' path='/:month/:id?/?' handler={BookModal} ignoreScrollBehavior>
        <NotFoundRoute handler={Error404Page} />
      </Route>
    </Route>
  )
};

export default routes;
