import React from 'react';
import PropTypes from 'prop-types';

// NYPL Components
import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
import Hero from '../Hero/Hero.jsx';
import AgeTabs from '../AgeTabs/AgeTabs.jsx';
import Books from '../Books/Books.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

const App = (props) => {
  const annualList = !!(props.params && props.params.type &&
    (props.params.type === 'childrens' || props.params.type === 'ya'));
  let mobileAboutLink = null;

  if (annualList) {
    mobileAboutLink = (
      <div className="mobile-about">
        <span className="mobile-about-divider"></span>
        <h2 className="mobile-about-link">
          <a href="http://nypl.org/books-music-dvds/recommendations/about/annual-lists">
            About this list
          </a>
        </h2>
      </div>
    );
  }

  return (
    <div className="home">
      <Header
        navData={navConfig.current}
        skipNav={{ target: 'app-content' }}
      />
      <Hero {...props} annualList={annualList} />
      <div id="app-content">
        {props.children}

        {!annualList && (<AgeTabs />)}

        <div className="main-container">
          <div id="sidebar">
            <Sidebar filters={props.filters} {...props} annualList={annualList} />
          </div>
          <div id="books">
            <Books {...props} annualList={annualList} />
          </div>

          {mobileAboutLink}
        </div>
      </div>
      <Footer id="footer" className="footer" />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object,
  filters: PropTypes.object,
  params: PropTypes.object,
};

export default App;
