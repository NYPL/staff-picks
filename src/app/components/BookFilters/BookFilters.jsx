import React from 'react';
import PropTypes from 'prop-types';
import { FilterIcon } from 'dgx-svg-icons';
import {
  contains as _contains,
  findWhere as _findWhere,
} from 'underscore';

import Filter from './Filter';

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Create an array data structure of filter objects.
      filters: this.props.filters.map(filter => ({
        active: false,
        id: filter.toLowerCase().split(' ').join('-'),
        label: filter,
      })),
      focusId: '',
    };

    this.renderItems = this.renderItems.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getFilterArray = this.getFilterArray.bind(this);
  }

  onClick(filterId, active) {
    // const filterId = filter.toLowerCase().split(' ').join('-');
    const f = _findWhere(this.state.filters, { id: filterId });
    // This is still the filter object from the state, but we just want to modify
    // its active property.
    f.active = active;
    this.props.setSelectedFilter(filterId, active);

    this.setState({
      filters: this.state.filters,
      focusId: filterId,
    });
  }

  /*
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

  /*
   * renderItems(filters)
   * Render the filter button list items.
   * @param {array} filter
   */
  renderItems(filters) {
    return filters.map((filter, i) =>
      <Filter key={i} filter={filter} onClick={this.onClick} focusId={this.state.focusId} />
    );
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
      </div>
    );
  }
}

BookFilters.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
};

BookFilters.defaultProps = {
  filters: [],
};

export default BookFilters;
