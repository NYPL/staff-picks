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
        <li style={{'display': 'inline-block', 'margin': '10px 10px 0 0'}}>{tag}</li>
      );
    });

    return (
      <div style={this.props.style}>
        <p>Filed under:</p>
        <ul style={{'listStyle': 'none'}}>
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

    return (
      <div style={styles.BookIntro}>
        <p className='author' style={styles.Author}>By {book['staff-pick-item']['attributes']['author']}</p>
        <TagList tags={tags} style={styles.TagList} />
      </div>
    );
  }

  _handleClick (e) {
    e.preventDefault();
  }
};

BookIntro.defaultProps = {
  className: 'Booktitle',
  lang: 'en',
  onClick() {}
};

const styles={
  BookIntro: {
    fontSize: '10px',
    margin: '-20px 0 0 35%',
    '@media (max-width: 414px)': { 
      margin: '0 0 20px 0'
    }
  },
  Author: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  TagList :{
    color: 'rgb(191, 191, 191)',
    fontSize: '14px',
    margin: '10px 0 0 0'
  }
};

export default Radium(BookIntro);