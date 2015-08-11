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
      {property: "og:image", content: '/recommendations/staff-picks/client/images/staff_pic_bg.jpg'},
      {property: "og:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
      {property: "og:site_name", content: 'Staff Picks | The New York Public Library'},
      {property: "og:url", content: 'http://nypl.org/recommendations/staff-picks/'},
      {name: "twitter:card", content: 'summary_large_image'},
      {name: "twitter:site", content: '@nypl'},
      {name: "twitter:title", content: 'Staff Picks | The New York Public Library'},
      {name: "twitter:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
      {name: "twitter:creator", content: '@nypl'},
      {name: "twitter:image", content: '/recommendations/staff-picks/client/images/staff_pic_bg.jpg'}
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
  childrenRoute = rpRoute;

if (rpRoute === '/') {
  childrenRoute = '';
}

let routes = (
    <Route name='home' path={rpRoute} handler={App} ignoreScrollBehavior>
      <Route name='month' path={childrenRoute + '/:month?/?'} ignoreScrollBehavior/>
      <Route name='modal' path={childrenRoute + '/:month/:id?/?'} handler={BookModal} ignoreScrollBehavior>
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

Router.run(routes, Router.HistoryLocation, (Root) => {
  console.log(Router.HistoryLocation.getCurrentPath());
  React.render(<Root data={staffPicks} filters={{'filters': filters['filters']}}
    currentList={currentList} />,
    document.getElementById('content'));
});

