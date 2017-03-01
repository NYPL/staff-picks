import React from 'react';

import utils from '../../utils/utils.js';

const styles = {
  available: {
    background: '#0095c8',
  },
  unavailable: {
    background: '#a5a4a4',
  },
  linkUnavailable: {
    color: '#cdcdcd',
    cursor: 'default',
  },
};

const BookContent = (props) => {
  // Return the full catalog slug if it already points to Encore,
  // or get the ID of the book and return a link that points to Encore.
  const getEncoreLink = (catalogSlug, start, end) => {
    let catalogSub;

    if (!catalogSlug || catalogSlug === 'na' || catalogSlug === 'n/a') {
      return;
    }

    // Replace existing http links with https protocol
    catalogSlug = catalogSlug.replace(/^http:\/\//i, 'https://');

    // Create the catalog link based on the catalog slug
    if (catalogSlug.indexOf('browse.nypl.org') === -1) {
      catalogSub = catalogSlug.substring(start, end);
      return `https://browse.nypl.org/iii/encore/record/C__Rb${catalogSub}?lang=eng`;
    }

    return catalogSlug;
  };

  const book = props.book;
  const item = book.item;
  const pickType = props.type;

  let bookStyle = styles.available;
  let ebookStyle = styles.available;
  let bookHREF;
  let ebookHREF;
  let bookLinkStyle;
  let ebookLinkStyle;
  let bookIcon;
  let ebookIcon;
  let picker;

  bookHREF = getEncoreLink(item.catalogSlug, 0, 8);
  ebookHREF = getEncoreLink(item.ebookUri, 41, 49);

  if (!ebookHREF) {
    ebookStyle = styles.unavailable;
    ebookIcon = 'disabled';
    ebookLinkStyle = styles.linkUnavailable;
  }
  if (!bookHREF) {
    bookStyle = styles.unavailable;
    bookIcon = 'disabled';
    bookLinkStyle = styles.linkUnavailable;
  }

  if (pickType === 'home') {
    picker = (
      <span className="staff-pick-text">
        Staff Pick By: {book.picker}, {book.location}
      </span>
    );
  } else {
    picker = (
      <span className="staff-pick-text">
        Committee Pick for 2015
      </span>
    );
  }

  return (
    <div className={props.className}>
      <p className="description">{book.text}</p>
      <div className="staff-pick">
        <span className="staff-pick-icon"></span>
        {picker}
      </div>

      <ul className="borrow">
        <li
          style={bookStyle}
          onClick={() => utils.trackPicks('Modal', 'Request the book')}
        >
          <a href={bookHREF} style={bookLinkStyle}>
            <span className={`checkout ${bookIcon}`}></span>Request the book
          </a>
        </li>
        <li
          style={ebookStyle}
          onClick={() => utils.trackPicks('Modal', 'Borrow the ebook')}
        >
          <a href={ebookHREF} style={ebookLinkStyle}>
            <span className={`ebook ${ebookIcon}`}></span>Borrow the ebook
          </a>
        </li>
      </ul>
    </div>
  );
};

BookContent.defaultProps = {
  className: 'BookContent',
  lang: 'en',
};

BookContent.propTypes = {
  book: React.PropTypes.object,
  type: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default BookContent;
