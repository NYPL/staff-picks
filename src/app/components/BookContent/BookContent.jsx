import React from 'react';
import Radium from 'radium';

import utils from '../../utils/utils.js';

class BookContent extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  // Return the full catalog slug if it already points to Encore,
  // or get the ID of the book and return a link that points to Encore.
  _getEncoreLink(catalogSlug, start, end) {
    let catalogSub;

    if (catalogSlug === 'na' || catalogSlug === 'n/a') {
      return;
    }

    if (catalogSlug && catalogSlug.indexOf('browse.nypl.org') === -1) {
      catalogSub = catalogSlug.substring(start, end);
      return `http://browse.nypl.org/iii/encore/record/` +
        `C__Rb${catalogSub}?lang=eng`;
    }

    return catalogSlug;
  }

  render() {
    const book = this.props.book,
      item = book.item,
      pickType = this.props.type;

    let bookStyle = styles.available,
      ebookStyle = styles.available,
      bookHREF,
      ebookHREF,
      bookLinkStyle,
      ebookLinkStyle,
      bookIcon,
      bookSubstringID,
      ebookSubstringID,
      ebookIcon,
      picker;

    bookHREF = this._getEncoreLink(item.catalogSlug, 0, 8);
    ebookHREF = this._getEncoreLink(item.ebookUri, 41, 49);

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
      picker = (<span className='staff-pick-text'>Staff Pick By: {book.picker}, {book.location}</span>);
    } else {
      picker = (<span className='staff-pick-text'>Committee Pick for 2015</span>);
    }

    return (
      <div ref='BookContent' className={this.props.className}>      
        <p className='description'>{book.text}</p>
        <div className='staff-pick'>
          <span className='staff-pick-icon'></span>
          {picker}
        </div>

        <ul className='borrow'>
          <li style={[ styles.li, bookStyle ]}
            onClick={utils._trackPicks.bind(this, 'Modal', 'Request the book')}>
            <a href={bookHREF} style={bookLinkStyle}>
              <span className={`checkout ${bookIcon}`}></span>Request the book
            </a>
          </li>
          <li style={[ styles.li, ebookStyle ]}
            onClick={utils._trackPicks.bind(this, 'Modal', 'Borrow the ebook')}>
            <a href={ebookHREF} style={ebookLinkStyle}>
              <span className={`ebook ${ebookIcon}`}></span>Borrow the ebook
            </a>
          </li>
        </ul>
      </div>
    );
  }
};

BookContent.defaultProps = {
  className: 'BookContent',
  lang: 'en'
};

const styles = {
  base: {},
  li: {
    borderRadius: '5px',
    marginRight: '20px',
    display: 'inline-block'
  },
  available: {
    background: '#0095c8'
  },
  unavailable: {
    background: '#a5a4a4'
  },
  linkUnavailable:{
    color: '#cdcdcd',
    cursor: 'default'
  }
};

export default Radium(BookContent);
