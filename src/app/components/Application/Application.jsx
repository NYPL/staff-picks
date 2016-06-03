import React from 'react/addons';
import DocMeta from 'react-doc-meta';
import { Router, Link } from 'react-router';

// NYPL Components
import Header from 'dgx-header-component';
import Hero from '../Hero/Hero.jsx';
import AgeTabs from '../AgeTabs/AgeTabs.jsx';
import Books from '../Books/Books.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

import utils from '../../utils/utils';

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let content = 'True stories, tales of courage, historical romances, ' +
        'edge-of-your-seat thrillers... There is a huge world of books ' +
        'out there. Our expert staff members pick out their favorites ' +
        'to help you find your next one.',
      hompageTags = [
        {property: 'og:title', content: 'Staff Picks | The New York Public Library'},
        {property: 'og:image', content: '/browse/recommendations/staff-picks/src/client/images/shelftalker.4.2.png'},
        {property: 'og:description', content: content},
        {property: 'og:url', content: 'http://www.nypl.org/browse/recommendations/staff-picks/'},
        {name: 'twitter:title', content: 'Staff Picks | The New York Public Library'},
        {name: 'twitter:description', content: content},
        {name: 'twitter:image', content: '/browse/recommendations/staff-picks/src/client/images/shelftalker.4.2.png'}
      ],
      tags = utils.metaTagUnion(hompageTags),
      about = null;

    if (this.props.params && this.props.params.type) {
      about = (<div className='mobile-about'>
          <span className='mobile-about-divider'></span>
          <h2 className='mobile-about-link'>
            <a href='http://nypl.org/browse/recommendations/about/annual-lists'>
              About this list
            </a>
          </h2>
        </div>);
    }

    return (
      <div>
        <Header />
        <Hero {...this.props} />
        <div id="app-content">
          {this.props.children}
          <AgeTabs {...this.props} />
          <div className='main-container'>
            <div id='sidebar'>
              <Sidebar filters={this.props.filters} {...this.props} />
            </div>
            <div id='books'>
              <Books {...this.props} />
            </div>
            {about}
          </div>
        </div>
      </div>
    );
  }
};

export default App;
