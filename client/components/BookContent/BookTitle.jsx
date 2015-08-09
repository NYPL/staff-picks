import React from 'react';
import Radium from 'radium';

class BookTitle extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    const book = this.props.book;

    return (
      <div ref='BookContent' className={this.props.className}>
        <h2 style={styles.BookTitle}>{book['item']['attributes']['title']}</h2>
      </div>
    );
  }
};

BookTitle.defaultProps = {
  className: 'Booktitle',
  lang: 'en',
  onClick() {}
};

const styles={
  BookTitle: {
    fontFamily: 'MiloSlabPro, RobotoSlabLight, serif',
    fontSize: '3em',
    margin: '20px 0 0 35%',
    '@media (max-width: 414px)': { 
      margin: '0'
    }
  }
};

export default Radium(BookTitle);
