import React from 'react';
import PropTypes from 'prop-types';

// NYPL Components
import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';

import Hero from '../Hero/Hero.jsx';
import AgeTabs from '../AgeTabs/AgeTabs.jsx';
import Books from '../Books/Books.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import BookStore from '../../stores/BookStore.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {}

  render() {
    const annualList = !!(this.props.params && this.props.params.type &&
      (this.props.params.type === 'childrens' || this.props.params.type === 'ya'));
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
        <Hero
          params={this.props.params}
          location={this.props.location}
          annualList={annualList}
        />

        <div id="app-content">
          {this.props.children}

          {!annualList && (<AgeTabs />)}

          <div className="main-container">
            <div id="sidebar">
              <Sidebar {...this.state} annualList={annualList} />
            </div>
            <div id="books">
              <Books {...this.props} annualList={annualList} />
            </div>

            {mobileAboutLink}
          </div>
        </div>
        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  filters: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
};

export default App;
