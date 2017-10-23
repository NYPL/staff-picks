import React from 'react';
import PropTypes from 'prop-types';

import BookFilters from '../BookFilters/BookFilters.jsx';

const Sidebar = (props) => (
  <div className="sidebar nypl-column-one-quarter">
    <BookFilters filters={props.filters} />

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

Sidebar.propTypes = {
  filters: PropTypes.array,
};

export default Sidebar;
