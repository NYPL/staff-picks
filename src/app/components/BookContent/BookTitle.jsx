import React from 'react';
import Radium from 'radium';

class BookTitle extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    const book = this.props.book;
    let title = (book && book.item) ? book.item.title : "Book Title";

    return (
      <div ref='BookTitle' className={this.props.className}>
        <h2>{title}</h2>
      </div>
    );
  }
};

BookTitle.defaultProps = {
  className: 'BookTitle',
  lang: 'en',
  onClick() {}
};

export default Radium(BookTitle);
