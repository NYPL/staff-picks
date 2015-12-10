import React from 'react';
import Radium from 'radium';

class Book extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const book = this.props.book,
      bookImgSrc = book.item.imageSlug,
      bookTarget = book.item.catalogSlug,
      fullImgSrc = bookImgSrc !== 'No Image' ? `https://contentcafe2.btol.com/ContentCafe/` +
        `Jacket.aspx?&userID=NYPL49807&password=CC68707&` +
        `Value=${bookImgSrc}&content=M&Return=1&Type=M`
        : '/browse/recommendations/staff-picks/src/client/images/book-place-holder.png';

    return (
      <div ref='Book' className={this.props.className}
        style={[this.props.style]}>
        
        <a href='#' onClick={this._handleClick}>
          <img style={this.props.style}
            alt={book.item.title}
            src={fullImgSrc}
            height={this.props.height}
            width={this.props.width} />
        </a>
      </div>
    );
  }

  _handleClick(e) {
    e.preventDefault();
  }
};

Book.defaultProps = {
  className: 'Book',
  lang: 'en'
};

export default Radium(Book);
