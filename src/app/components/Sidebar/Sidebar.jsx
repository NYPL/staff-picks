// Import React and other utility libraries
import React from 'react';
import radium from 'radium';

import BookDisplayButtons from '../BookDisplayButtons/BookDisplayButtons.jsx';
import BookFilters from '../BookFilters/BookFilters.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';

import utils from '../../utils/utils.js';

const styles = {
  mobileFilters: {
    display: 'block',
    height: '100%',
    position: 'fixed',
    overflow: 'auto',
    top: '50px',
    backgroundColor: '#fff',
    width: '100%',
    left: '0',
    zIndex: '1000',
    padding: '35px 30px',
    '@media (min-width: 719px)': {
      display: 'none',
    },
  },
  mobileFilterBtn: {
    textDecoration: 'none',
    color: '#0095c8',
  },
  active: {
    border: '2px solid #0095c8',
    color: 'red',
  },
  grayedOutFilter: {
    color: '#bfbfbf',
  },
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileDisplay: false,
    };

    this.showFilters = this.showFilters.bind(this);
    this.hideFilters = this.hideFilters.bind(this);
  }

  showFilters() {
    this.setState({ mobileDisplay: true });
    // Make the whole document not scrollable for mobile version
    document.body.className = 'no-scroll';
    window.scrollTo(0, 0);

    utils.trackPicks('Filters', 'Mobile display filters');
  }

  hideFilters() {
    this.setState({ mobileDisplay: false });
    // Make the whole document scrollable again
    document.body.className = '';

    utils.trackPicks('Filters', 'Mobile close filters');
  }

  render() {
    let about = null;

    if (this.props.params && this.props.params.type) {
      about = (
        <div className="about">
          <span className="about-divider"></span>
          <h2 className="about-link">
            <a href="http://nypl.org/browse/recommendations/about/annual-lists">
              About this list
            </a>
          </h2>
        </div>
      );
    }

    return (
      <div ref="sidebar" className="sidebar-content">
        <BookDisplayButtons />

        <SimpleButton
          gaCategory="Staff Picks"
          gaAction="Mobile Filter"
          gaEvent="Filter"
          className="mobile-filter-btn"
          onClick={this.showFilters}
          style={styles.mobileFilterBtn}
          label="Filter By Tags"
        />

        <BookFilters
          {...this.props}
          styles={this.state.mobileDisplay ? styles.mobileFilters : null}
          mobile={this.state.mobileDisplay}
          mobileCloseBtn={this.hideFilters}
        />

        {about}
      </div>
    );
  }
}

Sidebar.propTypes = {
  params: React.PropTypes.object,
};

export default radium(Sidebar);
