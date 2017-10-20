/* global $, Isotope */

import React from 'react';
import PropTypes from 'prop-types';
import {
  extend as _extend,
  map as _map,
} from 'underscore';

import Book from '../Book/Book.jsx';
import TimeSelector from '../TimeSelector/TimeSelector.jsx';
import BookStore from '../../stores/BookStore.js';

const styles = {
  base: {},
  gridWidth: {
    width: '250px',
  },
};

class Books extends React.Component {
  constructor(props) {
    super(props);

    this.state = _extend({
      book: {},
      books: [],
    }, BookStore.getState());

    this.onChange = this.onChange.bind(this);
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

  render() {
    const currentMonthPicks = this.state.currentMonthPicks;
    const picks = currentMonthPicks.picks ? currentMonthPicks.picks : [];
    const books = picks.map(element => {
      const tagList = element.item.tags || [];
      const tagIDs = _map(tagList, tag => tag.id);
      const tagClasses = tagIDs.join(' ');

      return (
        <li
          className={`book-item ${tagClasses}`}
          key={element.id}
          style={styles.gridWidth}
        >
          <Book
            book={element}
            className="book"
          />
        </li>
      );
    });

    return (
      <div>
        <TimeSelector
          currentMonthPicks={currentMonthPicks}
          annualList={this.props.annualList}
          params={this.props.params}
        />

        <ul className="list-view">
          {books}
        </ul>
      </div>
    );
  }
}

Books.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  annualList: PropTypes.bool,
};

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
};

export default Books;
