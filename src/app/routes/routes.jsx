// React library
import React from 'react';
// Import Router
import { IndexRoute, Route, Redirect } from 'react-router';

// Import components
import App from '../components/Application/Application.jsx';
import Main from '../components/Application/Main.jsx';
import BookPage from '../components/BookPage/BookPage.jsx';

// Routes we need
const routes = {
  client: (
    <Route path="/books-music-dvds/recommendations/staff-picks/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/books-music-dvds/recommendations/staff-picks/annual/:type" component={Main} />
      <Route
        path="/books-music-dvds/recommendations/staff-picks/annual/:type/:year"
        component={Main}
      />
      <Route
        path="/books-music-dvds/recommendations/staff-picks/annual/:type/:year/:id"
        component={BookPage}
      />
      <Route path="/books-music-dvds/recommendations/staff-picks/:month" component={Main} />
      <Route path="/books-music-dvds/recommendations/staff-picks/:month/:id" component={BookPage} />
    </Route>
  ),
  server: (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/annual/:type" component={Main} />
      <Route path="/annual/:type/:year" component={Main} />
      <Route path="/annual/:type/:year/:id" component={BookPage} />
      <Route path="/:month" component={Main} />
      <Route path="/:month/:id" component={BookPage} />
    </Route>
  ),
};

export default routes;
