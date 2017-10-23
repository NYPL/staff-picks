import React from 'react';
import PropTypes from 'prop-types';
import { FilterIcon } from 'dgx-svg-icons';

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(list) {
    return list.map((elem, i) => <li key={i}>{elem}</li>);
  }

  renderFilterList() {
    const filters = this.props.filters;

    return (
      <ul>
        {this.renderItems(filters)}
      </ul>
    );
  }

  render() {
    return (
      <div className="book-filters">
        <div className="book-filters-heading">
          <h2><FilterIcon />Filter by Tags</h2>
        </div>
        {this.renderFilterList()}
      </div>
    );
  }
}

BookFilters.propTypes = {
  filters: PropTypes.array,
};

export default BookFilters;
