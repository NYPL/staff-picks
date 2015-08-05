// Import React and other utility libraries
import React from 'react';
import Radium from 'radium';

import BookDisplayButtons from './BookDisplayButtons.jsx';
import BookFilters from './BookFilters.jsx';

class Sidebar extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      mobileDisplay: false
    };

    this._showFilters = this._showFilters.bind(this);
    this._hideFilters = this._hideFilters.bind(this);
  }

  _showFilters() {
    this.setState({mobileDisplay: true});
    // Make the whole document not scrollable for mobile version
    document.body.className = 'no-scroll';
    window.scrollTo(0, 0);
  }

  _hideFilters() {
    this.setState({mobileDisplay: false});
    // Make the whole document scrollable again
    document.body.className = '';
  }

  render () {
    return (
      <div ref='sidebar' className='sidebar-content'>
        <BookDisplayButtons />
        <h2 className='mobile-filter-btn' onClick={this._showFilters} style={styles.mobileFilterBtn}>
          Filter By Tags
        </h2>
        <BookFilters {...this.props} styles={this.state.mobileDisplay ? styles.mobileFilters : null}
          mobile={this.state.mobileDisplay} mobileCloseBtn={this._hideFilters}/>
      </div>
    );
  }
};

Sidebar.defaultProps = {};

const styles = {
  base: {},
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
    padding: '35px 30px'
  },
  mobileFilterBtn: {
    textDecoration: 'none',
    color: '#0095c8',
    cursor: 'pointer'
  },
  active: {
    border: '2px solid #0095c8',
    color: 'red'
  },
  grayedOutFilter: {
    color: '#bfbfbf'
  }
};

export default Radium(Sidebar);
