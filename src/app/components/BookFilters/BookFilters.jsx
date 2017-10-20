import React from 'react';
import PropTypes from 'prop-types';
import { sortBy as _sortBy } from 'underscore';

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(list) {
    return list.map((elem) => <li key={elem.id}>{elem.attributes.tag}</li>);
  }

  renderFilterList() {
    const filters = _sortBy(this.props.filters, (f) => f.attributes.tag);

    return (
      <ul>
        {this.renderItems(filters)}
      </ul>
    );
  }

  render() {
    return (
      <div className="BookFilters">
        <span className="divider"></span>
        <h2>What would you like to read?</h2>
        <div className="BookFilters-lists">
          {this.renderFilterList()}
        </div>
      </div>
    );
  }
}

BookFilters.propTypes = {
  filters: PropTypes.array,
};

export default BookFilters;
