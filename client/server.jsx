'use strict';
// import 'styles/main.scss';
import React from 'react/addons';
import Radium from 'radium';
import DocMeta from 'react-doc-meta';
import Router from 'react-router';

// NYPL Components
import Header from './components/HeaderOld/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Footer from './components/Footer/Footer.jsx';
import AgeTabs from './components/AgeTabs/AgeTabs.jsx';
import Error404Page from './components/Error404Page/Error404Page.jsx';
import Books from './components/Books/Books.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import BookModal from './components/BookModal/BookModal.jsx';

// Utilities
import API from './utils/ApiService';

/* Reads from local storage (i.e. Refinery) */
// If we follow the FLUX architecture
// data would not be defined, instead we would
// load the data via Store Actions and update our
// App Constants. As of now, we are mocking an API
// call to fetch the data.
// const data = API.getData();
// const books = API.getBooks();

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let tags = [
      {property: "og:title", content: 'Staff Picks | The New York Public Library'},
      {property: "og:type", content: 'website'},
      {property: "og:image", content: '/client/images/staff_pic_bg.jpg'},
      {property: "og:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
      {property: "og:site_name", content: 'Staff Picks | The New York Public Library'},
      {property: "og:url", content: 'http://nypl.org/staff-picks'},
      {name: "twitter:card", content: 'summary_large_image'},
      {name: "twitter:site", content: '@nypl'},
      {name: "twitter:title", content: 'Staff Picks | The New York Public Library'},
      {name: "twitter:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
      {name: "twitter:creator", content: '@nypl'},
      {name: "twitter:image", content: '/client/images/staff_pic_bg.jpg'}
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
            <Sidebar filters={this.props.filters}/>
          </div>
          <div id='books'>
            <Books books={this.props.data} currentList={this.props.currentList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(App);
