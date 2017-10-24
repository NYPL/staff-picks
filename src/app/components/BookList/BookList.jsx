import React from 'react';
import PropTypes from 'prop-types';

import Book from '../Book/Book.jsx';
import utils from '../../utils/utils';

const BookList = (props) => {
  const currentPicks = props.currentMonthPicks;
  const picks = currentPicks.picks ? currentPicks.picks : [];
  const getFilteredBookItems = (pickItems, selectedFilters) => {
    // Only execute filtering if the picks object is not empty
    if (pickItems.length) {
      // Only execute filtering if the selectedFilters object is not empty
      if (selectedFilters.length) {
        return pickItems.filter(book => {
          // Get the pick's tags in an ID readable array
          const tagArray = utils.getPickTags(book);
          // Get the array of selected tags found in the book item
          const inSelectedFilter = utils.getSelectedTags(tagArray, props.selectedFilters);

          if (inSelectedFilter.length &&
              (inSelectedFilter.length === props.selectedFilters.length)) {
            return book;
          }

          return undefined;
        });
      }
      // No filters, return original picks
      return pickItems;
    }
    return pickItems;
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

BookList.propTypes = {
  currentMonthPicks: PropTypes.object,
  selectedFilters: PropTypes.array,
};

BookList.defaultProps = {
  className: 'booklist',
  lang: 'en',
};

export default BookList;
