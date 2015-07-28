import React from 'react';
import Radium from 'radium';
import cx from 'classnames';
import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import API from '../../utils/ApiService.js';

import { Link } from 'react-router';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayType: BookStore.getBookDisplay(),
      gridActive: BookStore.getActiveGrid(),
      listActive: BookStore.getActiveList(),
      filters: BookStore.getFilters()
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
      listActive: BookStore.getActiveList(),
      filters: BookStore.getFilters()
    });
  }
}

var drivenByFiltersElems, themeFiltersElems;

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    let filterList = API.getFilters(),
      themeFilters = [],
      drivenByFilters = [];

    _.each(filterList, function (filter) {
      filter.active = false;
      filter.show = true;
      if (filter.attributes.tag.indexOf('Driven') !== -1) {
        filter.attributes.tag = (filter.attributes.tag).replace(/\bDriven/ig,'');
        drivenByFilters.push(filter);
      } else {
        themeFilters.push(filter);
      }
    });

    this.state = {
      drivenByFilters,
      themeFilters,
      filters: BookStore.getFilters()
    };

    this._clearFilters = this._clearFilters.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    BookStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  filterItems (list) {
    const _this = this,
      _handleClick = this._handleClick;

    return list.map(function (elem, i) {
      let active = 'hide-filter';
      if (elem.active) {
        active = 'show-filter';
      }

      if (elem.show) {
        return (
          <li key={elem.id}>
            <Link to='/' onClick={_handleClick.bind(_this, elem)} query={{filters: elem.attributes.tag}}>
              {elem.attributes.tag}
              <ReactCSSTransitionGroup transitionName='minus' transitionAppear={true}>
                <span className={'minus-icon ' + active}></span>
              </ReactCSSTransitionGroup>
            </Link>
          </li>
        );
      }
      return null;
    });
  }

  render () {
    return (
      <div className='BookFilters'>
        <span className='divider'></span> 
        <h2>What would you like to read?</h2>
        <div className='BookFilters-lists'>
          <span>Driven by...</span>
          <ul>
            {this.filterItems(this.state.drivenByFilters)}
          </ul>
          <span>Themes...</span>
          <ul>
            {this.filterItems(this.state.themeFilters)}
          </ul>
          {this.state.filters.length ? 
            <div className='clearFilters' style={styles.clearFilters}>
              <a href='#' onClick={this._clearFilters}>
                Clear Filters
                <span className='close-icon'></span>
              </a>
            </div>
            : null
          }
        </div>
      </div>
    );
  }

  _onChange() {
    let filteredFilters = [],
      activeFilters = BookStore.getFilters(),
      bookElems = BookStore.getUpdatedFilters();

    if (!activeFilters.length) {
      _.each(this.state.drivenByFilters, function (filter) {
        filter.active = false;
        filter.show = true;
      });
      _.each(this.state.themeFilters, function (filter) {
        filter.active = false;
        filter.show = true;
      });
    } else {
      _.each(bookElems, function (elem) {
        let n = activeFilters.length,
          filters,
          classes = elem.className;

        _.each(activeFilters, function (filter) {
          if (classes.indexOf(filter) !== -1) {
            n -= 1;
          }
        });

        if (n === 0) {
          filters = classes.split(' ');
          filteredFilters = _.union(filteredFilters, filters);
        }
      });

      if (filteredFilters) {
        _.each(this.state.themeFilters, function (filter) {
          if (_.indexOf(filteredFilters, filter.id) === -1) {
            filter.show = false;
          } else {
            filter.show = true;
          }
        });
        _.each(this.state.drivenByFilters, function (filter) {
          if (_.indexOf(filteredFilters, filter.id) === -1) {
            filter.show = false;
          } else {
            filter.show = true;
          }
        });
      }
    }

    this.setState({
      filters: activeFilters
    });
  }

  _clearFilters(e) {
    e.preventDefault();
    BookActions.clearFilters();
  }

  _handleClick(filter) {
    let filterType = filter.id;
    filter.active = !filter.active;
    BookActions.toggleBookFilter(filterType);
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
  },
  clearFilters: {
    color: '#0095c8',
    marginTop: '20px'
  }
};

export default Radium(Sidebar);
