import React from 'react';
import PropTypes from 'prop-types';
import { LeftWedgeIcon } from 'dgx-svg-icons';

import BookFilters from '../BookFilters/BookFilters.jsx';

const Sidebar = (props) => (
  <div className="sidebar nypl-column-one-quarter">
    <a href="#" className="back-link">
      <LeftWedgeIcon />
      Best Books for kids
    </a>

    <BookFilters
      filters={props.filters}
      selectableFilters={props.selectableFilters}
      setSelectedFilter={props.setSelectedFilter}
      clearFilters={props.clearFilters}
    />
  </div>
);

Sidebar.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
};

export default Sidebar;
