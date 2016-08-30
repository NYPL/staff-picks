import React from 'react';

// NYPL Components
import { Header, navConfig } from 'dgx-header-component';
import Footer from 'dgx-react-footer';
import Hero from '../Hero/Hero.jsx';
import AgeTabs from '../AgeTabs/AgeTabs.jsx';
import Books from '../Books/Books.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

import utils from '../../utils/utils';

const App = (props) => {
  // Not being used here. Generated through Hero.jsx.
  const content = 'True stories, tales of courage, historical romances, ' +
    'edge-of-your-seat thrillers... There is a huge world of books ' +
    'out there. Our expert staff members pick out their favorites ' +
    'to help you find your next one.';
  const hompageTags = [
    { property: 'og:title', content: 'Staff Picks | The New York Public Library' },
    { property: 'og:image', content: '/browse/recommendations/staff-picks/src/client/images/' +
      'shelftalker.4.2.png' },
    { property: 'og:description', content },
    { property: 'og:url', content: 'http://www.nypl.org/browse/recommendations/staff-picks/' },
    { name: 'twitter:title', content: 'Staff Picks | The New York Public Library' },
    { name: 'twitter:description', content },
    { name: 'twitter:image', content: '/browse/recommendations/staff-picks/src/client/images/' +
      'shelftalker.4.2.png' },
  ];
  // const tags = utils.metaTagUnion(hompageTags);
  let about = null;

  if (props.params && props.params.type) {
    about = (
      <div className="mobile-about">
        <span className="mobile-about-divider"></span>
        <h2 className="mobile-about-link">
          <a href="http://nypl.org/browse/recommendations/about/annual-lists">
            About this list
          </a>
        </h2>
      </div>
    );
  }

  return (
    <div>
      <Header navData={navConfig.current} />
      <Hero {...props} />
      <div id="app-content">
        {props.children}
        <AgeTabs {...props} />
        <div className="main-container">
          <div id="sidebar">
            <Sidebar filters={props.filters} {...props} />
          </div>
          <div id="books">
            <Books {...props} />
          </div>
          {about}
        </div>
      </div>
      <Footer id="footer" className="footer" />
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.object,
  filters: React.PropTypes.object,
  params: React.PropTypes.object,
};

export default App;
