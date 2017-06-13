import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
  const handleClick = (e) => e.preventDefault();
  const book = props.book;
  const bookImgSrc = book.item.imageSlug;
  const fullImgSrc = bookImgSrc !== 'No Image' ?
    'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=NYPL49807' +
    `&password=CC68707&Value=${bookImgSrc}&content=M&Return=1&Type=M`
    : '/books-music-dvds/recommendations/staff-picks/src/client/images/book-place-holder.png';

  return (
    <div className={props.className}>
      <a href="#" onClick={handleClick}>
        <img
          alt={book.item.title}
          src={fullImgSrc}
          height={props.height}
          width={props.width}
        />
      </a>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

Book.defaultProps = {
  className: 'Book',
  lang: 'en',
};

export default Book;
