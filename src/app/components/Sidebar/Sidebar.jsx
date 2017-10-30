import React from 'react';
import PropTypes from 'prop-types';
import { LeftWedgeIcon } from 'dgx-svg-icons';

import BookFilters from '../BookFilters/BookFilters.jsx';
import About from '../About/About.jsx';
import config from '../../../../appConfig';

const Sidebar = (props) => (
  <div className="sidebar nypl-column-one-quarter">
    <a href={config.recommendationsLink.url} className="back-link">
      <LeftWedgeIcon /> {config.recommendationsLink.label}
    </a>

    <BookFilters
      filters={props.filters}
      selectableFilters={props.selectableFilters}
      setSelectedFilter={props.setSelectedFilter}
      clearFilters={props.clearFilters}
      selectedFilters={props.selectedFilters}
    />

    <About />
  </div>
);

Sidebar.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
  isJsEnabled: PropTypes.bool,
  selectedFilters: PropTypes.array,
};

Sidebar.defaultProps = {
  filters: [],
  selectableFilters: [],
  setSelectableFilters: () => {},
  clearFilters: () => {},
};

export default Sidebar;
