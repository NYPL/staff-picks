import React from 'react';
import Radium from 'radium';

import _ from 'underscore';

class BookContent extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    const book = this.props.book,
      staffPick = book['item'],
      bookTarget = staffPick['attributes']['catalog-slug'],
      ebookTarget = staffPick['attributes']['ebook-uri'] ?
        staffPick['attributes']['ebook-uri']['full-uri'] : undefined;

    let ebookHREF = ebookTarget,
      bookStyle = styles.available,
      ebookStyle = styles.available,
      bookHREF = bookTarget,
      bookLinkStyle,
      ebookLinkStyle,
      bookIcon,
      bookSubstringID,
      ebookSubstringID,
      ebookIcon,
      emptyLink;

    if (bookTarget && bookTarget.indexOf('browse.nypl.org') === -1) {
      bookSubstringID = bookTarget.substring(0, 8);
      bookHREF = `http://browse.nypl.org/iii/encore/record/C__Rb${bookSubstringID}?lang=eng`;
    }

    if (ebookTarget && ebookTarget.indexOf('browse.nypl.org') === -1) {
      ebookSubstringID = ebookTarget.substring(41, 49);
      ebookHREF = `http://browse.nypl.org/iii/encore/record/C__Rb${ebookSubstringID}?lang=eng`;
    }

    if (!ebookTarget) {
      ebookStyle = styles.unavailable;
      ebookIcon = 'disabled';
      ebookLinkStyle = styles.linkUnavailable;
      ebookHREF = emptyLink;
    }
    if (!bookTarget) {
      bookStyle = styles.unavailable;
      bookIcon = 'disabled';
      bookLinkStyle = styles.linkUnavailable;
      bookHREF = emptyLink;
    }

    return (
      <div ref='BookContent' className={this.props.className}>      
        <p className='description'>{book.attributes.text}</p>
        <div className='staff-pick'>
          <span className='staff-pick-icon'></span>
          <span className='staff-pick-text'>
            Staff Pick By: {book.attributes['picker-name']}, {book.attributes['location']}
          </span>
        </div>

        <ul className='borrow'>
          <li style={[ styles.li, bookStyle ]}>
            <a href={bookHREF} style={bookLinkStyle}>
              <span className={`checkout ${bookIcon}`}></span>Request the book
            </a>
          </li>
          <li style={[ styles.li, ebookStyle ]}>
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
