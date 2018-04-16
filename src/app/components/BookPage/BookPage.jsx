import React from 'react';
import PropTypes from 'prop-types';

import Book from '../Book/Book';
import BookStore from '../../stores/BookStore';

class BookPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
  }

  render() {
    const book = this.state.book;

    return (
      <div className={this.props.className}>
        <h2>{book.item.title}</h2>
        <Book
          book={this.state.book}
          className={`${this.props.className}__left-column__image__cover`}
        />
        <p className="BookIntro__author">By {this.state.book.item.author}</p>
      </div>
    );
  }
}

BookPage.propTypes = {
  className: PropTypes.string,
};

BookPage.defaultProps = {
  className: 'BookPage',
};

BookPage.contextTypes = {
  router: PropTypes.object,
};

export default BookPage;
