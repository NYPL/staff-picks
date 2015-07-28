import React from 'react';
import Radium from 'radium';

import _ from 'underscore';

class TagList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var tags = this.props.tags.map(function (tag) {
      return (
        <li style={{'display': 'inline-block', 'padding': '10px'}}>{tag}</li>
      );
    });

    return (
      <div>
        <p>Filed under:</p>
        <ul style={{'listStyle': 'none'}}>
          {tags}
        </ul>
      </div>
    );
  }
};

class BookContent extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render () {
    const book = this.props.book,
      bookTarget = book['staff-pick-item']['attributes']['catalog-slug'],
      ebookTarget = book['staff-pick-item']['attributes']['ebook-slug'],
      tags = _.chain(book['staff-pick-item']['staff-pick-tag'])
        .pluck('attributes')
        .pluck('tag')
        .flatten()
        .value();

    let bookHREF = `https://nypl.bibliocommons.com/item/show/${bookTarget}`,
      ebookHREF = `https://nypl.bibliocommons.com/item/show/${ebookTarget}`,
      bookStyle = styles.available,
      ebookStyle = styles.available;

    if (!ebookTarget) {
      ebookStyle = styles.unavailable;
      ebookHREF = '#';
    }
    if (!bookTarget) {
      bookStyle = styles.unavailable;
      bookHREF = '#';
    }

    return (
      <div ref='BookContent' className={this.props.className}>
        <h2>{book['staff-pick-item']['attributes']['title']}</h2>
        <p className='author'>By {book['staff-pick-item']['attributes']['author']}</p>
        <TagList tags={tags} />

        <p className='description'>{book.attributes.text}</p>

        <div className='staff-pick'>
          <span className='staff-pick-icon'></span>
          <span>Staff Pick By: {book.attributes['picker-name']}, {book.attributes['location']}</span>
        </div>

        <ul className='borrow'>
          <li style={[ styles.li, bookStyle ]}>
            <a href={bookHREF}>
              <span className='checkout'></span>Request the book
            </a>
          </li>
          <li style={[ styles.li, ebookStyle ]}>
            <a href={ebookHREF}>
              <span className='ebook'></span>Borrow the eBook
            </a>
          </li>
        </ul>

      </div>
    );
  }

  _handleClick (e) {
    e.preventDefault();
  }
};

BookContent.defaultProps = {
  className: 'BookContent',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {

  },
  li: {
    borderRadius: '5px',
    marginRight: '20px',
    display: 'inline-block'
  },
  available: {
    background: '#0095c8'
  },
  unavailable: {
    background: '#776E64'
  }
};

export default Radium(BookContent);
