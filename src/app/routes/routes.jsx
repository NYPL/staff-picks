// React libraries
import React from 'react';
// Import Router
import { Route, Router } from 'react-router';

// Import components
import App from '../components/Application/Application.jsx';
import BookModal from '../components/BookModal/BookModal.jsx';
import Error404Page from '../components/Error404Page/Error404Page.jsx';
import AgeTabs from '../components/AgeTabs/AgeTabs.jsx';

// Routes we need
const routes = {
  client: (
    <Route path='/browse/recommendations/staff-picks' component={App}>
      <Route path='annual'>
        <Route path=':type/?'>
          <Route path=':year/?'>
            <Route path=':id/?' component={BookModal} />
          </Route>
        </Route>
      </Route>
      <Route path=':month/?'>
        <Route path=':id/?' component={BookModal} />
      </Route>
    </Route>
  ),
  server: (
    <Route path='/browse/recommendations/staff-picks' component={App}>
      <Route path='/annual/:type/?' />
      <Route path='/annual/:type/:year/?' />
      <Route path='/annual/:type/:year/:id/?' component={BookModal} />
      <Route path='/:month/?' />
      <Route path='/:month/:id/?' component={BookModal} />
    </Route>
  )
};

export default routes;
