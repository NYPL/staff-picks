import React from 'react';
import Radium from 'radium';
import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import API from '../../utils/ApiService.js';
import { Link } from 'react-router';
import SimpleButton from '../Buttons/SimpleButton.jsx';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class CloseButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick (e) {
    e.preventDefault();
    this.props.onClick();
  }

  render () {
    return (
      <SimpleButton style={styles.CloseButton}
        id='close-button' 
        label=''
        onClick={this._handleClick} />
    );
  }
};


class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    let filterList = this.props.filters ? this.props.filters['filters'] : API.getFilters()['filters'],
      themeFilters = [],
      drivenByFilters = [];

    _.each(filterList, function (filter) {
      filter.active = false;
      filter.show = true;
      filter.remove = true;
      if (filter.attributes.tag.indexOf('Driven') !== -1) {
        filter.attributes.displayName = (filter.attributes.tag).replace(/\bDriven/ig,'');
        drivenByFilters.push(filter);
      } else {
        filter.attributes.displayName = filter.attributes.tag;
        themeFilters.push(filter);
      }
    });

    this.state = {
      drivenByFilters,
      themeFilters,
      filters: BookStore.getFilters(),
      age: BookStore.getAge()
    };

    this._clearFilters = this._clearFilters.bind(this);
    this._onChange = this._onChange.bind(this);
    this._filterItems = this._filterItems.bind(this);
  }

  componentDidMount () {
    BookStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  render () {
    let styles = this.props.styles || {};

    return (
      <div className='BookFilters' style={styles}>
        <span className='divider'></span>
        <CloseButton onClick={this.props.mobileCloseBtn} />
        <h2>What would you like to read?</h2>
        <div className='BookFilters-lists'>
          <span>Driven by...</span>
          <ul>
            {this._filterItems(this.state.drivenByFilters)}
          </ul>
          <span>Themes...</span>
          <ul>
            {this._filterItems(this.state.themeFilters)}
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
            <h2 className='mobile-done-button'>
              <a onClick={this.props.mobileCloseBtn}>
                Done
              </a>
            </h2>
        </div>
      </div>
    );
  }

  _filterItems (list) {
    const _this = this,
      _handleClick = this._handleClick;

    return list.map(function (elem, i) {
      let active = 'hide-filter',
        liElement;
      if (elem.active) {
        active = 'show-filter';
      }

      if (elem.show) {
        liElement = (
          <li key={elem.id} onClick={_handleClick.bind(_this, elem)}>
            <a>
              {elem.attributes.displayName}
              <ReactCSSTransitionGroup transitionName='minus' transitionAppear={true}>
                <span className={'minus-icon ' + active}></span>
              </ReactCSSTransitionGroup>
            </a>
          </li>
        );
      } else {
        liElement = (
          <li key={elem.id} style={styles.grayedOutFilter}>{elem.attributes.displayName}</li>
        );
      }

      return elem.remove ? liElement : null;
      // <Link to='/' onClick={_handleClick.bind(_this, elem)} query={{filters: elem.attributes.displayName}}>
    });
  }

  _onChange() {
    let filteredFilters = [],
      activeFilters = BookStore.getFilters(),
      age = BookStore.getAge(),
      bookElems = BookStore.getUpdatedFilters();

    let updatedBooksElems = [];
    _.each(bookElems, function (elem) {
      if (elem.className.indexOf(age) !== -1) {
        updatedBooksElems.push(elem);
      }
    });

    // Update/reset the filters based on a new age
    if (this.state.age !== age) {
      this.setState({age: age});
      _.each(this.state.drivenByFilters, function (filter) {
        filter.active = false;
        filter.show = true;
        filter.remove = false;
        _.each(updatedBooksElems, function (elem) {
          if (elem.className.indexOf(filter.id) !== -1) {
            filter.remove = true;
          }
        });
      });
      _.each(this.state.themeFilters, function (filter) {
        filter.active = false;
        filter.show = true;
        filter.remove = false;
        _.each(updatedBooksElems, function (elem) {
          if (elem.className.indexOf(filter.id) !== -1) {
            filter.remove = true;
          }
        });
      });
    }

    // For clearing the filters and unselecting a filter.
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

        if (classes.indexOf(age) !== -1) {
          _.each(activeFilters, function (filter) {
            if (classes.indexOf(filter) !== -1) {
              n -= 1;
            }
          });

          if (n === 0) {
            filters = classes.split(' ');
            filteredFilters = _.union(filteredFilters, filters);
          }
        }
      });

      if (filteredFilters) {
        _.each(this.state.themeFilters, function (filter) {
          filter.show = true;
          if (_.indexOf(filteredFilters, filter.id) === -1) {
            filter.show = false;
          }
        });
        _.each(this.state.drivenByFilters, function (filter) {
          filter.show = true;
          if (_.indexOf(filteredFilters, filter.id) === -1) {
            filter.show = false;
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
};

const styles = {
  base: {},
  clearFilters: {
    color: '#0095c8',
    marginTop: '20px'
  },
  grayedOutFilter: {
    color: '#bfbfbf'
  },
  CloseButton: {
    background: 'url("/client/images/icons/gray_x_button.svg") no-repeat',
    position: 'absolute',
    fontSize: '1.3em',
    height: 'auto',
    margin: '0 0 20px 0',
    padding: '5px 4px 30px 36px',
    top: '3%',
    left: '90%',
    '@media (min-width: 719px)': {
      display: 'none'
    }
  }
};

export default Radium(BookFilters);
