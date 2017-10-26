import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  FilterIcon,
  ResetIcon,
} from 'dgx-svg-icons';
import {
  contains as _contains,
  // findWhere as _findWhere,
} from 'underscore';

import Filter from './Filter';

const ANIMATION_TIMEOUT = 600;

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Create an array data structure of filter objects.
      filters: this.props.filters.map(filter => ({
        id: filter.toLowerCase().split(' ').join('-'),
        label: filter,
      })),
      activeIds: [],
      focusId: '',
    };

    this.renderItems = this.renderItems.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getFilterArray = this.getFilterArray.bind(this);
    this.getActiveIds = this.getActiveIds.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  onClick(filterId, active) {
    // const foundFilter = _findWhere(this.state.filters, { id: filterId });
    const activeIds = this.getActiveIds(filterId, active);
    // This is still the filter object from the state, but we just want to modify
    // its active property.
    // foundFilter.active = active;
    this.props.setSelectedFilter(filterId, active);

    this.setState({
      filters: this.state.filters,
      focusId: filterId,
      activeIds,
    });
  }

  /**
   * getActiveIds(filterId, active)
   * Get an array of filter IDs that are currently active/selected.
   * @param {string} filterId
   * @param {boolean} active
   * @return {array}
   */
  getActiveIds(filterId, active) {
    let activeIds = [];

    if (active) {
      activeIds = this.state.activeIds.concat(filterId);
    } else {
      activeIds = this.state.activeIds.filter(id => id !== filterId);
    }

    return activeIds;
  }

  /**
   * getFilterArray(selectableFilters, filters)
   * If the list of selectable filters is available, then we want the subset of all filters
   * that can be selected. A selectable filter is based on whether or not it is available
   * from a rendered pick item.
   * @param {array} selectableFilters
   * @param {array} filters
   */
  getFilterArray(selectableFilters, filters) {
    if (!selectableFilters.length) {
      return filters;
    }
    return filters.filter(filter => _contains(selectableFilters, filter.id));
  }

  clearFilters() {
    this.setState({ activeIds: [] });
    this.props.clearFilters();

    setTimeout(() => {
      ReactDOM.findDOMNode(this.refs.clearFilters).focus();
    }, ANIMATION_TIMEOUT);
  }

  /**
   * renderItems(filters)
   * Render the filter button list items.
   * @param {array} filter
   */
  renderItems(filters) {
    return filters.map((filter, i) => {
      const active = _contains(this.state.activeIds, filter.id);
      return (
        <Filter
          key={i}
          filter={filter}
          onClick={this.onClick}
          focusId={this.state.focusId}
          active={active}
        />
      );
    });
  }

  render() {
    const { filters } = this.state;
    const { selectableFilters } = this.props;
    const filtersToRender = this.getFilterArray(selectableFilters, filters);

    return (
      <div className="book-filters">
        <div className="book-filters-heading">
          <h2><FilterIcon />Filter by Tags</h2>
        </div>
        <ul>
          {this.renderItems(filtersToRender)}
        </ul>
        {
          !!this.state.activeIds.length &&
            (<button
              onClick={this.clearFilters}
              className="nypl-primary-button clear-button"
              ref="clearFilters"
            >
              <ResetIcon />
              Clear Filters
            </button>)
        }
      </div>
    );
  }
}

BookFilters.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
};

BookFilters.defaultProps = {
  filters: [],
};

export default BookFilters;
