import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import utils from '../../utils/utils.js';

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();

    this._handleClick = this._handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this._onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this._onChange);
  }

  // Will eventually need to break this out into its own component.
  // Need to think about classes, icons, and passed down click functions.
  _pillButton(label, classprop, clickprop) {
    return (
      <a onClick={clickprop}>
        <span className={classprop}></span>
        {label}
      </a>
    );
  }

  render() {
    let gridActive = this.state._bookDisplay === 'grid',
      listActive = this.state._bookDisplay !== 'grid';

    const gridActiveButton = cx({ active: gridActive });
    const listActiveButton = cx({ active: listActive });

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-List`}>
          <li className={gridActiveButton}>
            {this._pillButton('COVERS', `${this.props.className}-grid-icon icon`, this._handleClick.bind(this, 'grid'))}
          </li>
          <li className={listActiveButton}>
            {this._pillButton('LIST', `${this.props.className}-list-icon icon`, this._handleClick.bind(this, 'list'))}
          </li>
        </ul>
      </div>
    );
  }

  /* Utility Methods should be declared below the render method */
  _handleClick(_bookDisplay) {
    BookActions.updateBookDisplay(_bookDisplay);

    utils._trackPicks('Display Selected', _bookDisplay);
  }

  _onChange() {
    this.setState(BookStore.getState());
  }
};

BookDisplayButtons.defaultProps = {
  className: 'BookDisplayButtons',
  id: 'BookDisplayButtons'
};

export default Radium(BookDisplayButtons);
