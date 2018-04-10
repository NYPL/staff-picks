import React from 'react';
import PropTypes from 'prop-types';
import { LeftWedgeIcon } from '@nypl/dgx-svg-icons';

import BookFilters from '../BookFilters/BookFilters.jsx';
import ListSelector from '../ListSelector/ListSelector.jsx';
import config from '../../../../appConfig';

// This data is a temporary dummy data for creating the season list
const fieldsetProps = {
  fieldsetName: 'season',
  options: [
    { name: '2018 Winter', value: '2018-01-01' },
    { name: '2017 Fall', value: '2017-09-01' },
    { name: '2017 Summer', value: '2017-06-01' },
    { name: '2017 Spring', value: '2017-04-01' },
  ],
};

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

  const renderListSelector = (data) => {
    if (!data.options.length) {
      return null;
    }

    return (
      <ListSelector fieldsetProps={data} isJsEnabled={props.isJsEnabled} />
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
      {renderListSelector(fieldsetProps)}
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
