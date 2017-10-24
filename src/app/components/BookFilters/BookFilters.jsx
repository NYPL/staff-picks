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
      filters: this.props.filters.map(filter => ({
        active: false,
        id: filter.toLowerCase().split(' ').join('-'),
        label: filter,
      })),
    };

    this.renderItems = this.renderItems.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(filter, active) {
    const filterId = filter.toLowerCase().split(' ').join('-');
    const f = _findWhere(this.state.filters, { id: filterId });
    // This is still the filter object from the state:
    f.active = active;
    this.props.setSelectedFilter(filterId, active);

    this.setState({ filters: this.state.filters });
  }

  renderItems(filters) {
    const filtersToRender = this.props.selectableFilters.length ?
      filters.filter(filter =>
        _contains(this.props.selectableFilters, filter.id)
      )
      : filters;

    return filtersToRender.map((filter, i) =>
      <Filter key={i} filter={filter} onClick={this.onClick} />
    );
  }

  render() {
    const filters = this.state.filters;

    return (
      <div className="book-filters">
        <div className="book-filters-heading">
          <h2><FilterIcon />Filter by Tags</h2>
        </div>
        <ul>
          {this.renderItems(filters)}
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

export default BookFilters;
