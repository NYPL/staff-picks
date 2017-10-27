import React from 'react';
import PropTypes from 'prop-types';

import About from '../About/About.jsx';
import Book from '../Book/Book.jsx';

const BookList = (props) => {
  const renderBookItems = (currentBooks) => (
    currentBooks.length ? currentBooks.map((book, i) => <Book key={i} book={book} />) : null
  );

  return (
    <div className="booklist nypl-column-three-quarters">
      <h2>2017 Picks</h2>

      <ul className="nypl-row">
        {renderBookItems(props.picks)}
      </ul>

      <About />
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
