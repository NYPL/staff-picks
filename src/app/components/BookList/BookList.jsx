import React from 'react';
import PropTypes from 'prop-types';

import Book from '../Book/Book.jsx';

const BookList = (props) => {
  const renderBookItems = (currentBooks) => (
    currentBooks.length ? currentBooks.map((book, i) => <Book key={i} pick={book} />) : null
  );

  return (
    <div className="booklist nypl-column-three-quarters">
      <h2>2017 Picks</h2>
      <ul className="nypl-row">
        {renderBookItems(props.picks)}
      </ul>
    </div>
  );
};

BookList.propTypes = {
  picks: PropTypes.array,
};

BookList.defaultProps = {
  picks: [],
};

BookList.defaultProps = {
  className: 'booklist',
  lang: 'en',
};

export default BookList;
