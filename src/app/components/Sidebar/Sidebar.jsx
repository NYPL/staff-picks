import React from 'react';
import PropTypes from 'prop-types';
import { LeftWedgeIcon } from '@nypl/dgx-svg-icons';

import BookFilters from '../BookFilters/BookFilters';
import config from '../../../../appConfig';

const Sidebar = ({
  filters,
  selectableFilters,
  setSelectedFilter,
  clearFilters,
  selectedFilters,
  picksCount,
  isJsEnabled,
}) => {
  const renderBookFilters = (shouldDisplay) => {
    if (!shouldDisplay) {
      return null;
    }

    return (
      <BookFilters
        filters={filters}
        selectableFilters={selectableFilters}
        setSelectedFilter={setSelectedFilter}
        clearFilters={clearFilters}
        selectedFilters={selectedFilters}
        picksCount={picksCount}
      />
    );
  };

  return (
    <div className="sidebar nypl-column-one-quarter">
      <nav aria-label="Breadcrumbs">
        <a href={config.recommendationsLink.url} className="back-link">
          <LeftWedgeIcon ariaHidden />
          <span className="replaced-text visuallyHidden">Return to </span>
          {config.recommendationsLink.label}
        </a>
      </nav>
      {renderBookFilters(isJsEnabled)}
    </div>
  );
};

Sidebar.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  selectableFilters: PropTypes.arrayOf(PropTypes.object),
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
  isJsEnabled: PropTypes.bool,
  selectedFilters: PropTypes.arrayOf(PropTypes.object),
  picksCount: PropTypes.number,
};

Sidebar.defaultProps = {
  filters: [],
  selectableFilters: [],
  setSelectedFilter: () => {},
  clearFilters: () => {},
  isJsEnabled: false,
  selectedFilters: [],
  picksCount: 0,
};

export default Sidebar;
