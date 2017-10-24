import React from 'react';
import PropTypes from 'prop-types';

import config from '../../../../appConfig.js';
import utils from '../../utils/utils';

const Book = ({ book }) => {
  const bookImgSrc = book.imageSlug || 'No Image';
  const fullImgSrc = bookImgSrc !== 'No Image' ?
    'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=NYPL49807' +
    `&password=CC68707&Value=${bookImgSrc}&content=M&Return=1&Type=M`
    : `${config.baseUrl}src/client/images/book-place-holder.png`;
  const tagArray = utils.getPickTags(book);
  const tagClasses = tagArray.join(' ');

  return (
    <li
      className={`book-item nypl-column-half ${tagClasses}`}
      key={book.title.trim()}
    >
      <h4>{book.title}</h4>
      <p>{book.text}</p>
      <a href="#">
        <img alt="" src={fullImgSrc} />
      </a>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object,
};

export default Book;
