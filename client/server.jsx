'use strict';
// import 'styles/main.scss';
import React from 'react/addons';
import Radium from 'radium';
import DocMeta from 'react-doc-meta';
import Router from 'react-router';

// NYPL Components
import AgeTabs from './components/AgeTabs/AgeTabs.jsx';
import Error404Page from './components/Error404Page/Error404Page.jsx';
import Books from './components/Books/Books.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let tags = [
      {property: "og:title", content: 'Staff Picks | The New York Public Library'},
      {property: "og:type", content: 'website'},
      {property: "og:image", content: '/recommendations/staff-picks/client/images/shelftalker.4.2.png'},
      {property: "og:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
      {property: "og:site_name", content: 'Staff Picks | The New York Public Library'},
      {property: "og:url", content: 'http://www.nypl.org/recommendations/staff-picks/'},
      {name: "twitter:card", content: 'summary_large_image'},
      {name: "twitter:site", content: '@nypl'},
      {name: "twitter:title", content: 'Staff Picks | The New York Public Library'},
      {name: "twitter:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
      {name: "twitter:creator", content: '@nypl'},
      {name: "twitter:image", content: '/recommendations/staff-picks/client/images/shelftalker.4.2.png'}
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
