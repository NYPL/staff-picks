import React from 'react';
import PropTypes from 'prop-types';
import { LeftWedgeIcon } from '@nypl/dgx-svg-icons';

import BookFilters from '../BookFilters/BookFilters.jsx';
import config from '../../../../appConfig';

const Sidebar = (props) => {
  const renderBookFilters = (shouldDisplay) => {
    if (!shouldDisplay) {
      return null;
    }

    return (
      <BookFilters
        filters={props.filters}
        selectableFilters={props.selectableFilters}
        setSelectedFilter={props.setSelectedFilter}
        clearFilters={props.clearFilters}
        selectedFilters={props.selectedFilters}
        picksCount={props.picksCount}
      />
    );
  };

  return (
    <div className="sidebar nypl-column-one-quarter">
      <nav aria-label="Breadcrumbs">
        <a href={config.recommendationsLink.url} className="back-link">
          <LeftWedgeIcon title="Return to" ariaHidden={false} /> {config.recommendationsLink.label}
        </a>
      </nav>
      {renderBookFilters(props.isJsEnabled)}
    </div>
  );
};

Sidebar.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
  isJsEnabled: PropTypes.bool,
  selectedFilters: PropTypes.array,
  picksCount: PropTypes.number,
};

Sidebar.defaultProps = {
  filters: [],
  selectableFilters: [],
  setSelectableFilters: () => {},
  clearFilters: () => {},
};

export default Sidebar;
