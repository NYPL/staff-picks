import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../appConfig.js';
import utils from '../../utils/utils';

const Book = ({ pick }) => {
  const fullImgSrc = (!pick.imageSlug || pick.imageSlug === '') ? `${config.baseUrl}src/client/images/book-place-holder.png` :
    'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx' +
    `?&userID=NYPL49807&password=CC68707&Value=${pick.imageSlug}&content=M&Return=1&Type=M`;
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
        <p>{pick.book.text}</p>
      </div>
    </li>
  );
};

Book.propTypes = {
  pick: PropTypes.object,
};

export default Book;
