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
    <Route name='home' path='/' component={App}>
      <Route name='annual' path='annual'>
        <Route name ='type' path=':type/?'>
          <Route name='year' path=':year/?'>
            <Route name='annualModal' path=':id/?' component={BookModal} />
          </Route>
        </Route>
      </Route>
      <Route name='month' path=':month/?'>
        <Route name='modal' path=':id/?' component={BookModal} />
      </Route>
    </Route>
  ),
  server: (
    <Route name='home' path='/' component={App}>
      <Route name='annual' path='/annual/:type/?' />
      <Route name='year' path='/annual/:type/:year/?' />
      <Route name='annualModal' path='/annual/:type/:year/:id/?' component={BookModal} />
      <Route name='month' path='/:month/?' />
      <Route name='modal' path='/:month/:id/?' component={BookModal} />
    </Route>
  )
};

export default routes;
