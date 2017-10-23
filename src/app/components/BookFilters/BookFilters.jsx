import React from 'react';
import PropTypes from 'prop-types';

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
