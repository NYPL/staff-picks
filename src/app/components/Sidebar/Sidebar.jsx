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

  const renderSeasonFilters = (shouldDisplay) => {
    // if (!shouldDisplay) {
    //   return null;
    // }

    return (
      <form>
        <fieldset>
          <label htmlFor="seanson-input"></label>
          <select id="seasion-input" name="season" defaultValue="2018-01-01">
            <option value="2018-01-01">2018 Winter</option>
            <option value="2017-09-01">2017 Fall</option>
            <option value="2017-06-01">2017 Summer</option>
            <option value="2017-04-01">2017 Spring</option>
          </select>
        </fieldset>
      </form>
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
      {renderSeasonFilters()}
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
