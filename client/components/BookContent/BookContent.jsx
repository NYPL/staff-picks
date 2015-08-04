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
      staffPick = book['staff-pick-item'],
      bookTarget = staffPick['attributes']['catalog-slug'],
      ebookTarget = staffPick['attributes']['ebook-uri'] ? staffPick['attributes']['ebook-uri']['full-uri'] : undefined,
      tags = _.chain(staffPick['staff-pick-tag'])
        .pluck('attributes')
        .pluck('tag')
        .flatten()
        .value();

    let bookHREF = `https://nypl.bibliocommons.com/item/show/${bookTarget}`,
      ebookHREF = ebookTarget,
      bookStyle = styles.available,
      ebookStyle = styles.available,
      bookLinkStyle,
      ebookLinkStyle,
      bookIcon,
      ebookIcon,
      emptyLink;

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
          <span className='staff-pick-text'>Staff Pick By: {book.attributes['picker-name']}, {book.attributes['location']}</span>
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
  lang: 'en',
  onClick() {}
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
