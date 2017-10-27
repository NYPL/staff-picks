import React from 'react';
import PropTypes from 'prop-types';
import { LeftWedgeIcon } from 'dgx-svg-icons';

import BookFilters from '../BookFilters/BookFilters.jsx';
import About from '../About/About.jsx';

const Sidebar = (props) => (
  <div className="sidebar nypl-column-one-quarter">
    <a href="https://www.nypl.org/books-music-dvds/recommendations" className="back-link">
      <LeftWedgeIcon /> Recommendations
    </a>

    <BookFilters
      filters={props.filters}
      selectableFilters={props.selectableFilters}
      setSelectedFilter={props.setSelectedFilter}
      clearFilters={props.clearFilters}
    />

    <About />
  </div>
);

Sidebar.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
};

Sidebar.defaultProps = {
  filters: [],
  selectableFilters: [],
  setSelectableFilters: () => {},
  clearFilters: () => {},
};

export default Sidebar;
