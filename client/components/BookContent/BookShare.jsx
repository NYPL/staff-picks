import React from 'react';
import Radium from 'radium';

class BookShare extends React.Component {
	  // Constructor used in ES6
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render () {
    const book = this.props.book;

    return (
      <div ref='BookContent' className={this.props.className}>
        <h2 style={styles.BookTitle}>{book['staff-pick-item']['attributes']['title']}</h2>
      </div>
    );
  }

  _handleClick (e) {
    e.preventDefault();
  }
};

export default Radium(BookShare);