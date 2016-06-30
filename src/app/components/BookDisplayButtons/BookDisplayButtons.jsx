import React from 'react';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import utils from '../../utils/utils.js';

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();

    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(BookStore.getState());
  }

  /* Utility Methods should be declared below the render method */
  handleClick(bookDisplay) {
    BookActions.updateBookDisplay(bookDisplay);
    utils._trackPicks('Display Selected', bookDisplay);
  }

  // Will eventually need to break this out into its own component.
  // Need to think about classes, icons, and passed down click functions.
  pillButton(label, classprop, clickprop) {
    return (
      <a onClick={clickprop}>
        <span className={classprop}></span>
        {label}
      </a>
    );
  }

  render() {
    const gridActive = this.state._bookDisplay === 'grid';

    const gridActiveButton = gridActive ? 'active' : '';
    const listActiveButton = !gridActive ? 'active' : '';

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-List`}>
          <li className={gridActiveButton}>
            {this.pillButton('COVERS',
              `${this.props.className}-grid-icon icon`, this.handleClick.bind(this, 'grid'))}
          </li>
          <li className={listActiveButton}>
            {this.pillButton('LIST',
              `${this.props.className}-list-icon icon`, this.handleClick.bind(this, 'list'))}
          </li>
        </ul>
      </div>
    );
  }
}

BookDisplayButtons.propTypes = {
  className: React.PropTypes.string,
};

BookDisplayButtons.defaultProps = {
  className: 'BookDisplayButtons',
};

export default BookDisplayButtons;
