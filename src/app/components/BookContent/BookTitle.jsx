import React from 'react';
import PropTypes from 'prop-types';

const BookTitle = (props) => {
  const book = props.book;
  const title = (book && book.item) ? book.item.title : 'Book Title';

  return (
    <div className={props.className}>
      <h2>{title}</h2>
    </div>
  );
};

BookTitle.propTypes = {
  book: PropTypes.object,
  className: PropTypes.string,
};

BookTitle.defaultProps = {
  className: 'BookTitle',
};

export default BookTitle;
