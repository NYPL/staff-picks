import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../appConfig.js';

const Book = ({ pick }) => {
  const fullImgSrc = (!pick.book.imageUrl || pick.book.imageUrl === '') ?
    `${config.baseUrl}src/client/images/book-place-holder.png` : pick.book.imageUrl;
  const tagArray = pick.tags.map(tag => tag.toLowerCase().split(' ').join('-'));
  const tagClasses = tagArray.join(' ');

  return (
    <li
      className={`book-item nypl-column-half ${tagClasses}`}
      key={pick.book.title.trim()}
    >
      <div className="book-item-image-box">
        <img alt="" src={fullImgSrc} />
      </div>
      <div className="book-item-description">
        <h4>
          <a href="#">{pick.book.title}</a>
        </h4>
        <p>{pick.reviews.text}</p>
      </div>
    </li>
  );
};

Book.propTypes = {
  pick: PropTypes.object,
};

export default Book;
