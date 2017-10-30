import React from 'react';
import PropTypes from 'prop-types';
import { EReaderIcon, BookIcon } from 'dgx-svg-icons';
import { isEmpty as _isEmpty, isString as _isString } from 'underscore';
import config from '../../../../appConfig';
import utils from '../../utils/utils';

const Book = ({ pick }) => {
  const isStringEmpty = (string) => (!_isString(string) || _isEmpty(string.trim()));

  const getBookObject = (obj) => (
    (!_isEmpty(obj) && obj.book) ? obj.book : null
  );
  const getReviewsArray = (obj) => (
    (!_isEmpty(obj) && obj.reviews) ? obj.reviews : []
  );
  const getTagsArray = (obj) => (
    (!_isEmpty(obj) && !_isEmpty(obj.tags)) ?
      obj.tags.map(tag => tag.toLowerCase().split(' ').join('-')) : []
  );

  const renderBookCoverImage = (imageUrl) => {
    const defaultImageUrl = `${config.baseUrl}src/client/images/book-place-holder.png`;
    const fullImgSrc = isStringEmpty(imageUrl) ? defaultImageUrl : imageUrl;
    return (
      <div className="book-item-image-box">
        <img alt="" src={fullImgSrc} />
      </div>
    );
  };

  const renderTitle = (title, link) => {
    const titleClass = 'book-item-title';

    if (!isStringEmpty(title)) {
      if (!isStringEmpty(link)) {
        return <h4 className={titleClass}><a href={link}>{title}</a></h4>;
      }
      return <h4 className={titleClass}>{title}</h4>;
    }
    return null;
  };

  const renderAuthor = (author) => (
    !isStringEmpty(author) ? <p className="book-item-author">{author}</p> : null
  );

  const renderCatalogLinks = (catalogUrl, ebookUrl) => {
    const catalogLink = !isStringEmpty(catalogUrl) ?
      <a href={catalogUrl} className="catalog-url">
        <BookIcon width="32px" height="32px" ariaHidden />
        <span>REQUEST THE BOOK</span>
      </a> : null;
    const ebookLink = !isStringEmpty(ebookUrl) ?
      <a href={ebookUrl} className="ebook-url">
        <EReaderIcon ariaHidden />
        <span>REQUEST THE E-BOOK</span>
      </a> : null;

    return (catalogLink || ebookLink) ?
      <div className="book-item-catalog-links">
        {catalogLink}
        {ebookLink}
      </div> : null;
  };

  const renderDescription = (reviewsArray) => {
    if (!_isEmpty(reviewsArray) && reviewsArray[0].text && reviewsArray[0].text.trim() !== '') {
      const text = reviewsArray[0].text;
      return <p className="book-item-description">{text}</p>
    }
    return null;
  };

  const book = getBookObject(pick) || {};
  const tagClasses = !_isEmpty(getTagsArray(pick)) ? getTagsArray().join(' ') : '';
  const reviewsArray = getReviewsArray(pick);

  return getBookObject(pick) ? (
    <li
      className={`book-item ${tagClasses}`}
      key={!isStringEmpty(book.title) ? book.title : null}
    >
      {renderBookCoverImage(book.imageUrl)}
      {renderTitle(book.title, book.catalogUrl)}
      {renderAuthor(book.author)}
      {renderCatalogLinks(book.catalogUrl, book.ebookUrl)}
      {renderDescription(reviewsArray)}
    </li>
  ) : null;
};

Book.propTypes = {
  pick: PropTypes.object,
};

export default Book;
