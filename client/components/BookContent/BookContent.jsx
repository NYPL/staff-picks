import React from 'react';
import Radium from 'radium';

class TagList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var tags = this.props.tags.map(function (tag) {
      return (
        <li style={{'display': 'inline-block', 'padding': '10px'}}>{tag.id}</li>
      );
    });

    return (
      <div>
        <p>Filed under:</p>
        <ul style={{'list-style': 'none'}}>
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
      href = `https://nypl.bibliocommons.com/item/show/${bookTarget}`;

    console.log(book);
    return (
      <div ref='BookContent' className={this.props.className}>
        <h2>{book['staff-pick-item']['attributes']['title']}</h2>
        <p className='author'>By {book['staff-pick-item']['attributes']['author']}</p>
        <TagList tags={book['staff-pick-item']['relationships']['tags'].data} />

        <p className='description'>{book.attributes.text}</p>

        <div className='staff-pick'>
          <span className='staff-pick-icon'></span><span>Staff Pick By: {book.attributes['picker-name']}, {book.attributes['location']}</span>
        </div>

        <ul className='borrow'>
          <li>
            <span className='checkout'></span>
            <a href={href}>Check Out This Book</a>
          </li>
          <li>
            <span className='ebook'></span>
            <a href='#'>Read the eBook!</a>
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

  }
};

export default Radium(BookContent);
