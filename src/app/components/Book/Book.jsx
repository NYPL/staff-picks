import React from 'react';
import PropTypes from 'prop-types';
import { EReaderIcon, BookIcon } from 'dgx-svg-icons';
import { isEmpty as _isEmpty, isString as _isString } from 'underscore';
import config from '../../../../appConfig';
import utils from '../../utils/utils';

const Book = ({ book }) => {
  const tagArray = book.tags.map(tag => tag.toLowerCase().split(' ').join('-'));
  const tagClasses = tagArray.join(' ');

  const isStringEmpty = (string) => (!_isString(string) || _isEmpty(string.trim()));

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

  const renderAuthor = (author) =>
    !isStringEmpty(author) ? <p className="book-item-author">{author}</p> : null;

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

  const renderDescription = (desc) =>
    !isStringEmpty(desc) ? <p className="book-item-description">{desc}</p> : null;

  return (
    <li
      className={`book-item ${tagClasses}`}
      key={book.title.trim()}
    >
      {renderBookCoverImage(book.imageUrl)}
      {renderTitle(book.title, '#')}
      {renderAuthor(book.author)}
      {renderCatalogLinks('#', '#')}
      {renderDescription(book.text)}
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object,
};

export default Book;
