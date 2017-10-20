import React from 'react';
import PropTypes from 'prop-types';

import config from '../../../../appConfig.js';

const Book = (props) => {
  const book = props.book;
  const bookImgSrc = book.imageSlug || '';
  const fullImgSrc = bookImgSrc !== 'No Image' ?
    'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=NYPL49807' +
    `&password=CC68707&Value=${bookImgSrc}&content=M&Return=1&Type=M`
    : `${config.baseUrl}src/client/images/book-place-holder.png`;

  return (
    <div className={props.className}>
      <a href="#" onClick={props.onClick}>
        <img
          alt=""
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
  onClick: PropTypes.func,
};

Book.defaultProps = {
  className: 'Book',
  lang: 'en',
};

export default Book;
