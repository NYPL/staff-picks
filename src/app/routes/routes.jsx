// React libraries
import React from 'react';
// Import Router
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

// Import components
import App from '../components/Application/Application.jsx';
import BookModal from '../components/BookModal/BookModal.jsx';
import Error404Page from '../components/Error404Page/Error404Page.jsx';
import AgeTabs from '../components/AgeTabs/AgeTabs.jsx';

// Routes we need
const routes = {
  client: (
    <Route name='home' path='/browse/recommendations/staff-picks/?' handler={App} ignoreScrollBehavior>
      <Route name='annual' path='annual'ignoreScrollBehavior>
        <Route name ='type' path=':type/?' ignoreScrollBehavior>
          <Route name='year' path=':year?/?' ignoreScrollBehavior>
            <Route name='annualModal' path=':id/?' handler={BookModal} ignoreScrollBehavior />
          </Route>
        </Route>
      </Route>
      <Route name='month' path='/browse/recommendations/staff-picks/:month?/?' ignoreScrollBehavior>
        <Route name='modal' path=':id/?' handler={BookModal} ignoreScrollBehavior />
      </Route>
    </Route>
  ),
  server: (
    <Route name='home' path='/' handler={App} ignoreScrollBehavior>
      <Route name='annual' path='annual'ignoreScrollBehavior>
        <Route name ='type' path=':type/?' ignoreScrollBehavior>
          <Route name='year' path=':year?/?' ignoreScrollBehavior>
            <Route name='annualModal' path=':id/?' handler={BookModal} ignoreScrollBehavior />
          </Route>
        </Route>
      </Route>
      <Route name='month' path='/:month?/?' ignoreScrollBehavior>
        <Route name='modal' path=':id/?' handler={BookModal} ignoreScrollBehavior />
      </Route>
    </Route>
  )
};

export default routes;
