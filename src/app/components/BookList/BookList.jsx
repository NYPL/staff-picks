import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book.jsx';
import {
  contains as _contains,
  each as _each,
} from 'underscore';

const Books = (props) => {
  const currentMonthPicks = props.currentMonthPicks;
  const picks = currentMonthPicks.picks ? currentMonthPicks.picks : [];
  const filteredBooks = props.selectedFilters.length ?
    picks.filter(book => {
      const tagArray = book.tags.map(tag => tag.toLowerCase().split(' ').join('-'));
      const inSelectedFilter = [];
      _each(tagArray, (bookTag) => {
        if (_contains(props.selectedFilters, bookTag)) {
          inSelectedFilter.push(bookTag);
        }
      });

      console.log(inSelectedFilter);
      if (inSelectedFilter.length) {
        return book;
      }
    })
    : picks;

  const books = picks.length ? filteredBooks.map((book, i) => <Book key={i} book={book} />) : null;

  return (
    <div className="booklist nypl-column-three-quarters">
      <h2>2017 Picks</h2>

      <ul className="nypl-row">
        {books}
      </ul>
    </div>
  );
};

Books.propTypes = {
  currentMonthPicks: PropTypes.object,
  selectedFilters: PropTypes.array,
};

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
};

export default Books;
