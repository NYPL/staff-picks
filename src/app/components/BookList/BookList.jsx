import React from 'react';
import PropTypes from 'prop-types';

import About from '../About/About.jsx';
import Book from '../Book/Book.jsx';

const BookList = (props) => {
  const renderBookItems = (currentBooks) => (
    currentBooks.length ? currentBooks.map((book, i) => <Book key={i} pick={book} />) : null
  );

  return (
    <div className="booklist-section nypl-column-three-quarters">
      <h2>2017 Picks</h2>

      {
        !!props.picks.length &&
        (<ul className="booklist nypl-row">
          {renderBookItems(props.picks)}
        </ul>)
      }

      <About listType={props.listType} />
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
