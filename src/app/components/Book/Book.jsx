import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../appConfig.js';

const Book = ({ book }) => {
  const fullImgSrc = (!book.imageSlug || book.imageSlug === '') ? `${config.baseUrl}src/client/images/book-place-holder.png` :
    'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx' +
    `?&userID=NYPL49807&password=CC68707&Value=${book.imageSlug}&content=M&Return=1&Type=M`;
  const tagArray = book.tags.map(tag => tag.toLowerCase().split(' ').join('-'));
  const tagClasses = tagArray.join(' ');

  return (
    <li
      className={`book-item nypl-column-half ${tagClasses}`}
      key={book.title.trim()}
    >
      <div className="book-item-image-box">
        <img alt="" src={fullImgSrc} />
      </div>
      <div className="book-item-description">
        <h4>
          <a href="#">{book.title}</a>
        </h4>
        <p>{book.text}</p>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object,
};

export default Book;
