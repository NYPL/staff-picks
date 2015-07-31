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
  }

  render () {
      const book = this.props.book,
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
};

BookIntro.defaultProps = {
  className: 'Booktitle',
  lang: 'en',
  onClick() {}
};

const styles={
  BookIntro: {
    fontSize: '10px',
    margin: '26px 0 0 35%',
    position: 'relative',
    top: '30%',
    '@media (max-width: 414px)': { 
      left: '15px',
      position: 'relative',
      top: '2px'
    }
  },
  Author: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  TagList :{
    color: 'rgb(191, 191, 191)',
    fontSize: '14px',
    margin: '10px 0 0 0',
    '@media (max-width: 414px)': { 
      fontSize: '18px'
    }
  }
};

export default Radium(BookIntro);
