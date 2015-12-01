import React from 'react';
import Radium from 'radium';

import _ from 'underscore';

class TagList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tags = this.props.tags.map((tag, i) => {
        return (
          <li key={i}>{tag}</li>
        );
      });

    return (
      <div className={this.props.className} style={this.props.style}>
        <p>Filed under:</p>
        <ul>
          {tags}
        </ul>
      </div>
    );
  }
};

class BookIntro extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  _getTags(tags) {
    return _.chain(tags)
      .pluck('tag')
      .flatten()
      .value();
  }

  render() {
    const book = this.props.book,
      tags = this._getTags(book.item.tags),
      author = book.item.author;

    return (
      <div className='book-modal__book-intro__div'>
        <p className='book-modal__book-intro__div__author'>By {author}</p>
        <TagList className='book-modal__book-intro__div__tags' tags={tags} />
      </div>
    );
  }
};

BookIntro.defaultProps = {
  className: 'Booktitle',
  lang: 'en',
  onClick() {}
};

export default Radium(BookIntro);
