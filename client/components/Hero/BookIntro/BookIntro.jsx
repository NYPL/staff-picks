import React from 'react';
import Radium from 'radium';

class BookIntro extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div
      id={this.props.id}
      className={this.props.className}
      style={[
        styles.base,
        this.props.style
      ]}>
        <p key='BookTitle' style={styles.base, styles.BookTitle}>{this.props.bookTitle}</p>
        <p key='BookQuote' style={styles.base, styles.BookQuote}>{this.props.quote}</p>
      </div>
    );
  }
};

BookIntro.defaultProps = {
  id: 'BookIntro',
  className: 'BookIntro',
  label: '',
  lang: 'en',
};

const styles = {
  base: {
    '@media (max-width: 480px)': { display: 'none' },
    boxSizing: 'border-box',
    color: 'white',
    fontFamily: 'MiloSlabPro',
    margin: '20px auto',
    overflow: 'auto',
    position: 'relative',
    width: '100%',
  },
  BookTitle: {
    '@media (max-width: 1200px)': { fontSize: '3em' },
    '@media (min-width: 768px) and (max-width: 979px)': { fontSize: '2em' },
    '@media (max-width: 767px)': { fontSize: '1em' },
    '@media (max-width: 480px)': { fontSize: '1em' },
    fontSize: '3em',
    lineHeight: '1em',
  },
  BookQuote: {
    '@media (max-width: 1200px)': { fontSize: '1.2em' },
    '@media (min-width: 768px) and (max-width: 979px)': { fontSize: '1em' },
    '@media (max-width: 767px)': { fontSize: '0.8em' },
    '@media (max-width: 480px)': { fontSize: '0.8em' },
    fontSize: '1.2em',
    marginTop: '20px'
  }
};

export default Radium(BookIntro);