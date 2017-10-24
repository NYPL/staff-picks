import React from 'react';
import PropTypes from 'prop-types';
import { FilterIcon } from 'dgx-svg-icons';

import Filter from './Filter';
import Actions from '../../actions/BookActions';

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(filterId, active) {
    Actions.setSelectedFilter(filterId, active);
  }

  renderItems(filters) {
    return filters.map((filter, i) =>
      <Filter key={i} filter={filter} onClick={this.onClick} />
    );
  }

  render() {
    const filters = this.props.filters;

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
};

export default BookFilters;
