'use strict';
import 'styles/main.scss';
import React from 'react/addons';
import DocMeta from 'react-doc-meta';

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

import MetaTags from './components/MetaTags/MetaTags.jsx';
import Router from 'react-router';
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
API.setPickList(pickList);

const books = API.getBooks();

let Route = Router.Route;
let NotFoundRoute = Router.NotFoundRoute;
let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    var tags = [
      {name: 'description', content: 'staff picks'},
      {itemProp: 'name', content: 'The Name or Title Here'},
      {itemProp: 'description', content: 'This is the page description'},
      {itemProp: 'image', content: '/client/images/staff_pic_bg.jpg'}
    ]

    return (
      <div>
        <DocMeta tags={tags} />
        <RouteHandler {...this.props} />
        <div id='age-tabs' className='age-tabs'>
          <AgeTabs />
        </div>
        <div className='main-container'>
          <div id='sidebar'>
            <Sidebar />
          </div>
          <div id='books'>
            <Books books={this.props.data} />
          </div>
        </div>
      </div>
    );
  }
}

let routes = (
    <Route path='/' handler={App} ignoreScrollBehavior>
      <Route name='modal' path='/:id' handler={BookModal} ignoreScrollBehavior>
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
  React.render(<Root data={staffPicks} />, document.getElementById('content'));
});

