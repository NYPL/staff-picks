import React from 'react';
// import Radium from 'radium';

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
  book: React.PropTypes.object,
  className: React.PropTypes.string,
};

BookTitle.defaultProps = {
  className: 'BookTitle',
};

export default BookTitle;
