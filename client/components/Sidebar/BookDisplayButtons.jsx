import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';
import _ from 'underscore';

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = _.extend({
      filters: BookStore.getFilters(),
      age: BookStore.getAge()
    }, BookStore.getState());

    this._handleClick = this._handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    BookStore.listen(this._onChange);
  }

  componentWillUnmount () {
    BookStore.unlisten(this._onChange);
  }

  render () {
    let gridActive = true,
      listActive = false;

    if (this.state._bookDisplay === 'grid') {
      gridActive = true;
      listActive = false;
    } else {
      gridActive = false;
      listActive = true;
    }

    const gridActiveButton = cx({ gridActive: gridActive, active: gridActive });
    const listActiveButton = cx({ listActive: listActive, active: listActive });

    return (
      <div className='BookDisplayButtons'>
        <ul className='BookDisplayButtons-list'>
          <div className='BookDisplayButtons-list__li-container'>
            <li className={gridActiveButton}>
              <a onClick={this._handleClick.bind(this, 'grid')}>
                <span className='BookDisplayButtons-grid-icon icon'></span>
                COVERS
              </a>
            </li>
          </div>
          <div className='BookDisplayButtons-list__li-container'>
            <li className={listActiveButton}>
              <a onClick={this._handleClick.bind(this, 'list')}>
                <span className='BookDisplayButtons-list-icon icon'></span>
                LIST
              </a>
            </li>
          </div>
        </ul>
      </div>
    );
  }

    /* Utility Methods should be declared below the render method */
  _handleClick (_bookDisplay) {
    BookActions.updateBookDisplay(_bookDisplay);
  }

  _onChange () {
    this.setState(_.extend({
      filters: BookStore.getFilters()
    }, BookStore.getState()));
  }
};

export default Radium(BookDisplayButtons);
