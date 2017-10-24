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
  const getFilteredBookItems = (picks, selectedFilters) => {
    // Only execute filtering if the picks object is not empty
    if (picks.length) {
      // Only execute filtering if the selectedFilters object is not empty
      if (selectedFilters.length) {
        return picks.filter(book => {
          const tagArray = book.tags.map(tag => tag.toLowerCase().split(' ').join('-'));
          const inSelectedFilter = [];
          _each(tagArray, (bookTag) => {
            if (_contains(selectedFilters, bookTag)) {
              inSelectedFilter.push(bookTag);
            }
          });
          console.log(inSelectedFilter);
          if (inSelectedFilter.length) {
            return book;
          }
        });
      }
      // No filters, return original picks
      return picks;
    }
    return picks;
  };

  const renderBookItems = (currentBooks) => (
    currentBooks.length ? currentBooks.map((book, i) => <Book key={i} book={book} />) : null
  );

  return (
    <div className="booklist nypl-column-three-quarters">
      <h2>2017 Picks</h2>
      <ul className="nypl-row">
        {renderBookItems(getFilteredBookItems(picks, props.selectedFilters))}
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
