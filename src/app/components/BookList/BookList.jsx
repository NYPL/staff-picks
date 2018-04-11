import React from 'react';
import PropTypes from 'prop-types';

import About from '../About/About';
import Book from '../Book/Book';

const BookList = ({ isJsEnabled, picks, listType }) => {
  const renderBookItems = currentBooks => (
    currentBooks.length ?
      currentBooks.map((book, i) => <Book key={i} pick={book} isJsEnabled={isJsEnabled} />)
      : null
  );

  return (
    <div className="booklist-section nypl-column-three-quarters">
      <h2>2017 Picks</h2>

      {
        !!picks.length && (
        <ul className="booklist nypl-row">
          {renderBookItems(picks)}
        </ul>)
      }

      <About listType={listType} />
    </div>
  );
};

BookList.propTypes = {
  picks: PropTypes.array,
  isJsEnabled: PropTypes.bool,
  listType: PropTypes.string,
};

BookList.defaultProps = {
  picks: [],
};

export default BookList;
