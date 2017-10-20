// Import React and other utility libraries
import React from 'react';
import PropTypes from 'prop-types';

import BookFilters from '../BookFilters/BookFilters.jsx';

class Sidebar extends React.Component {
  render() {
    return (
      <div ref="sidebar" className="sidebar-content">
        <BookFilters filters={this.props.filters} />

        <div className="about">
          <span className="about-divider"></span>
          <h2 className="about-link">
            <a href="http://nypl.org/books-music-dvds/recommendations/about/annual-lists">
              About this list
            </a>
          </h2>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  filters: PropTypes.array,
};

export default Sidebar;
