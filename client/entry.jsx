'use strict';

import 'styles/main.scss';
import React from 'react/addons';
import DocMeta from 'react-doc-meta';
import Router from 'react-router';

// Utilities
import API from './utils/ApiService';

// NYPL Components
import Header from './components/HeaderOld/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Footer from './components/Footer/Footer.jsx';
import AgeTabs from './components/AgeTabs/AgeTabs.jsx';
import Error404Page from './components/Error404Page/Error404Page.jsx';
import Books from './components/Books/Books.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import BookModal from './components/BookModal/BookModal.jsx';

import alt from './alt.js';
import Iso from 'iso';

/* Reads from local storage (i.e. Refinery) */
// If we follow the FLUX architecture
// data would not be defined, instead we would
// load the data via Store Actions and update our
// App Constants. As of now, we are mocking an API
// call to fetch the data.
// const data = API.getData();
// const books = API.getBooks();

API.setStaffPick(staffPicks);
API.setFilters(filters);

const books = API.getBooks();

let Route = Router.Route,
  NotFoundRoute = Router.NotFoundRoute,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let tags = [
      {property: "og:title", content: 'Staff Picks | The New York Public Library'},
      {property: "og:type", content: 'website'},
      {property: "og:image", content: '/recommendations/staff-picks/client/images/shelftalker.4.2.png'},
      {property: "og:description", content: 'Every month, NYPL\'s book experts share 100 titles they love.'},
      {property: "og:site_name", content: 'Staff Picks | The New York Public Library'},
      {property: "og:url", content: 'http://www.nypl.org/recommendations/staff-picks/'},
      {name: "twitter:card", content: 'summary_large_image'},
      {name: "twitter:site", content: '@nypl'},
      {name: "twitter:title", content: 'Staff Picks | The New York Public Library'},
      {name: "twitter:description", content: 'Every month, NYPL\'s book experts share 100 titles they love.'},
      {name: "twitter:creator", content: '@nypl'},
      {name: "twitter:image", content: '/recommendations/staff-picks/client/images/shelftalker.4.2.png.jpg'}
    ];

    return (
      <div>
        <DocMeta tags={tags} />
        <RouteHandler {...this.props} />
        <div id='age-tabs' className='age-tabs'>
          <AgeTabs />
        </div>
        <div className='main-container'>
          <div id='sidebar'>
            <Sidebar filters={this.props.filters} />
          </div>
          <div id='books'>
            <Books books={this.props.data} currentList={this.props.currentList}/>
          </div>
        </div>
      </div>
    );
  }
}

let rpRoute = Router.HistoryLocation.getCurrentPath(),
  childrenRoute = '';
// console.log(rpRoute);
if (rpRoute === '/recommendations/staff-picks/') {
  childrenRoute = '/recommendations/staff-picks';
}

let routes = (
    <Route name='home' path='/recommendations/staff-picks/' handler={App} ignoreScrollBehavior>
      <Route name='month' path='/recommendations/staff-picks/:month?/?' ignoreScrollBehavior/>
      <Route name='modal' path='/recommendations/staff-picks/:month/:id?/?' handler={BookModal} ignoreScrollBehavior>
        <NotFoundRoute handler={Error404Page} />
      </Route>
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

window.onload = () => {
  Iso.bootstrap((state, meta, container) => {
    alt.bootstrap(state);
    // console.log(state);
    Router.run(routes, Router.HistoryLocation, (Root) => {
      React.render(<Root />,
        document.getElementById('content'));
    });
  });
};


