'use strict';
import 'styles/main.scss';
import React from 'react/addons';

// NYPL Components
import Header from 'components/HeaderOld/Header.jsx';
import Hero from 'components/Hero/Hero.jsx';
import Footer from 'components/Footer/Footer.jsx';
import AgeTabs from 'components/AgeTabs/AgeTabs.jsx';
import Error404Page from 'components/Error404Page/Error404Page.jsx';

import Books from 'components/Books/Books.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';

// Utilities
import API from 'utils/ApiService';

/* Reads from local storage (i.e. Refinery) */
// If we follow the FLUX architecture
// data would not be defined, instead we would
// load the data via Store Actions and update our
// App Constants. As of now, we are mocking an API
// call to fetch the data.
const data = API.getData();
const books = API.getBooks();

import Router from 'react-router';
import BookModal from 'components/BookModal/BookModal.jsx';

let Route = Router.Route;
let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <RouteHandler />
        <div id='age-tabs' className='age-tabs'>
          <AgeTabs />
        </div>
        <div className='main-container'>
          <div id='sidebar'>
            <Sidebar />
          </div>
          <div id='books'>
            <Books />
          </div>
        </div>
      </div>
    );
  }
}

let routes = (
    <Route handler={App} ignoreScrollBehavior>
      <Route name='modal' path='/:id' handler={BookModal} ignoreScrollBehavior />
    </Route>
  );

React.render(<Header />, document.getElementById('header-container'));
React.render(<Footer />, document.getElementById('footer-container'));
React.render(<Hero />, document.getElementById('hero'));

// if ( !books ) {
//   React.render(<Error404Page />, document.getElementById("content"));
// } else {
//   React.reander(<App />, document.getElementById('content'));
// }

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root />, document.getElementById('content'));
});

