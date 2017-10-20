import React from 'react';
import PropTypes from 'prop-types';
import { sortBy as _sortBy } from 'underscore';

import BookStore from '../../stores/BookStore.js';

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
    this.onChange = this.onChange.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(BookStore.getState());
  }

  filterItems(list) {
    return list.map((elem) => <li key={elem.id}>{elem.attributes.tag}</li>);
  }

  renderFilterList() {
    let filters = this.state.initialFilters;

    // Join the two set of filters and sort alphabetically.
    filters = _sortBy(filters, (f) => f.attributes.tag);
    return (
      <ul>
        {this.filterItems(filters)}
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
  mobileCloseBtn: PropTypes.func,
  active: PropTypes.string,
  annualList: PropTypes.bool,
};

export default BookFilters;
