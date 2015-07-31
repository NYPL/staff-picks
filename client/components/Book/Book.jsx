import React from 'react';
import Radium from 'radium';

class Book extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modal: false
    };

    this._handleClick = this._handleClick.bind(this);
  }

  render () {
    const book = this.props.book,
      bookImgSrc = book['staff-pick-item']['attributes']['image-slug'],
      bookTarget = book['staff-pick-item']['attributes']['catalog-slug'],
      href = `https://nypl.bibliocommons.com/item/show/${bookTarget}`;

    return (
      <div ref='Book' className={this.props.className}
        style={[
          styles.base,
          this.props.style
        ]}>
        
        <a href='#' onClick={this._handleClick}>
          <img
            src={`https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=NYPL49807&password=CC68707&Value=${bookImgSrc}&content=M&Return=1&Type=M`}
            height={this.props.height}
            width={this.props.width}
            style={this.props.style} />
        </a>
      </div>
    );
  }

  _handleClick (e) {
    e.preventDefault();
  }
};

Book.defaultProps = {
  className: 'Book',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {
  }
};

export default Radium(Book);
