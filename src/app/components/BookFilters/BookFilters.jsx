import React from 'react';
import PropTypes from 'prop-types';
import {
  FilterIcon,
  ResetIcon,
} from 'dgx-svg-icons';
import { contains as _contains } from 'underscore';

import Filter from './Filter';

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Create an array data structure of filter objects.
      filters: this.props.filters.map(filter => ({
        id: filter.toLowerCase().split(' ').join('-'),
        label: filter,
      })),
      selectedFilters: this.props.selectedFilters,
      focusId: '',
    };

    this.renderItems = this.renderItems.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getFilterArray = this.getFilterArray.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedFilters: nextProps.selectedFilters });
  }

  onClick(filterId, active) {
    this.props.setSelectedFilter(filterId, active);

    this.setState({
      filters: this.state.filters,
      focusId: filterId,
    });
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

  /**
   * renderItems(filters)
   * Render the filter button list items.
   * @param {array} filter
   */
  renderItems(filters) {
    return filters.map((filter, i) => {
      const active = _contains(this.state.selectedFilters, filter.id);
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

    if (!filters.length) {
      return null;
    }

    const filtersToRender = this.getFilterArray(selectableFilters, filters);

    return (
      <div className="book-filters">
        <div className="book-filters-heading">
          <h2><FilterIcon /> Filter by Tags</h2>
          <span aria-live="assertive" aria-atomic="true">
            {this.props.picksCount} books found
          </span>
        </div>
        <ul>
          {this.renderItems(filtersToRender)}
        </ul>
        {
          !!this.state.selectedFilters.length &&
            (<button
              onClick={this.props.clearFilters}
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
  selectedFilters: PropTypes.array,
  picksCount: PropTypes.number,
};

BookFilters.defaultProps = {
  filters: [],
  selectableFilters: [],
  setSelectedFilter: () => {},
  clearFilters: () => {},
  selectedFilters: [],
};

export default BookFilters;
