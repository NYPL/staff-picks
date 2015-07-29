import React from 'react';
import Radium from 'radium';

class BookTitle extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render () {
    const book = this.props.book;
    //   bookTarget = book['staff-pick-item']['attributes']['catalog-slug'],
    //   ebookTarget = book['staff-pick-item']['attributes']['ebook-slug'],
    //   tags = _.chain(book['staff-pick-item']['staff-pick-tag'])
    //     .pluck('attributes')
    //     .pluck('tag')
    //     .flatten()
    //     .value();

    // let bookHREF = `https://nypl.bibliocommons.com/item/show/${bookTarget}`,
    //   ebookHREF = `https://nypl.bibliocommons.com/item/show/${ebookTarget}`,
    //   bookStyle = styles.available,
    //   ebookStyle = styles.available;

    // if (!ebookTarget) {
    //   ebookStyle = styles.unavailable;
    //   ebookHREF = '#';
    // }
    // if (!bookTarget) {
    //   bookStyle = styles.unavailable;
    //   bookHREF = '#';
    // }

    return (
      <div ref='BookContent' className={this.props.className}>
        <h2 style={styles.BookTitle}>{book['staff-pick-item']['attributes']['title']}</h2>
      </div>
    );
  }

  _handleClick (e) {
    e.preventDefault();
  }
};

BookTitle.defaultProps = {
  className: 'Booktitle',
  lang: 'en',
  onClick() {}
};

const styles={
  BookTitle: {
    fontSize: '3em',
    margin: '0 0 0 35%',
    '@media (max-width: 414px)': { 
      margin: '0 0 20px 0'
    }
  }
};

export default Radium(BookTitle);
