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
        <h2>{book['staff-pick-item']['attributes']['title']}</h2>
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
};

export default Radium(BookTitle);
