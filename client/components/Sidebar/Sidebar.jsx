import React from 'react';
import Radium from 'radium';
import cx from 'classnames';
import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import API from '../../utils/ApiService.js';

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayType: BookStore.getBookDisplay(),
      gridActive: BookStore.getActiveGrid(),
      listActive: BookStore.getActiveList()
    };

    this._handleClick = this._handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    BookStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  render () {
    let gridActive = this.state.gridActive;
    let listActive = !this.state.gridActive;
    const gridActiveButton = cx({ gridActive: gridActive, active: gridActive });
    const listActiveButton = cx({ listActive: listActive, active: listActive });

    return (
      <div className='BookDisplayButtons'>
        <ul className='BookDisplayButtons-list'>
          <li className={gridActiveButton}>
            <a onClick={this._handleClick.bind(this, 'grid')}>
              <span className='BookDisplayButtons-grid-icon icon'></span>
              COVERS
            </a>
          </li>
          <li className={listActiveButton}>
            <a onClick={this._handleClick.bind(this, 'list')}>
              <span className='BookDisplayButtons-list-icon icon'></span>
              LIST
            </a>
          </li>
        </ul>
      </div>
    );
  }

    /* Utility Methods should be declared below the render method */
  _handleClick (displayType) {
    BookActions.updateBookDisplay(displayType);
  }
  _onChange () {
    this.setState({
      displayType: BookStore.getBookDisplay(),
      gridActive: BookStore.getActiveGrid(),
      listActive: BookStore.getActiveList()
    });
  }
}

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterList: API.getFilters()
    };
  }

  render () {
    var themeFilters = [];
    var drivenByFilters = [];

    _.each(this.state.filterList, function (filter) {
      if (filter.attributes.tag.indexOf('Driven') !== -1) {
        filter.attributes.tag = (filter.attributes.tag).replace(/\bDriven/ig,'');
        drivenByFilters.push(filter);
      } else {
        themeFilters.push(filter);
      }
    });

    var filterItems = function (list) {
      return list.map(function (elem) {
        return (
          <li><a href='#'>{elem.attributes.tag}</a></li>
        );
      });
    }

    return (
      <div className='BookFilters'>
        <span className='divider'></span> 
        <h2>What would you like to read?</h2>
        <div className='BookFilters-lists'>
          <span>Driven by...</span>
          <ul>
            {filterItems(drivenByFilters)}
          </ul>
          <span>Themes...</span>
          <ul>
            {filterItems(themeFilters)}
          </ul>
          <div className='clearFilters'>Clear Filters X</div>
        </div>
      </div>
    );
  }
}

class Sidebar extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div ref='sidebar' className='sidebar-content'>
        <BookDisplayButtons />
        <BookFilters />
      </div>
    );
  }
};

Sidebar.defaultProps = {
};

const styles = {
  base: {

  },
  active: {
    border: '2px solid #0095c8',
    color: 'red'
  }
};

export default Radium(Sidebar);
