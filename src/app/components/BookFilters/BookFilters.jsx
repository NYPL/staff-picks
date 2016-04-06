import React from 'react';
import Radium from 'radium';
import { each as _each, extend as _extend, indexOf as _indexOf, union as _union } from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';
import CloseButton from '../Buttons/CloseButton.jsx';

import utils from '../../utils/utils.js';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this._setFilters();

    this._clearFilters = this._clearFilters.bind(this);
    this._onChange = this._onChange.bind(this);
    this._filterItems = this._filterItems.bind(this);
  }

  componentDidMount() {
    BookActions.updateFilterAge('adult');
    BookStore.listen(this._onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this._onChange);
  }

  render() {
    let styles = this.props.styles || {},
      storeState = BookStore.getState();

    return (
      <div className='BookFilters' style={styles}>
        <CloseButton
          onClick={this.props.mobileCloseBtn}
          id='close-button'
          className='BookFilters__close-btn'/>
        <span className='divider'></span>
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
          {storeState._filters.length ? 
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

  _setFilters() {
    let store = BookStore.getState();
    let filterList = store._initialFilters,
      themeFilters = [],
      drivenByFilters = [];

    _each(filterList, filter => {
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

    this.state = _extend({
      drivenByFilters,
      themeFilters
    }, BookStore.getState());
  }

  _filterItems (list) {
    const _this = this,
      _handleClick = this._handleClick;

    return list.map((elem, i) => {
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
    });
  }

  _onChange() {
    let filteredFilters = [],
      storeState = BookStore.getState(),
      activeFilters = storeState._filters,
      age = storeState._age,
      bookElems = storeState._updatedFilters,
      params = this.props.params;

    let updatedBooksElems = [];
    _each(bookElems, elem => {
      if (elem.className.indexOf(age) !== -1) {
        updatedBooksElems.push(elem);
      }
    });

    // update filter list in state
    if (storeState._isotopesDidUpdate) {
      this._setFilters();
    }

    // Update/reset the filters based on a new age
    if (this.state._age !== age || storeState._isotopesDidUpdate) {
      this.setState({_age: age});
      _each(this.state.drivenByFilters, filter => {
        filter.active = false;
        filter.show = true;
        filter.remove = false;
        _each(updatedBooksElems, elem => {
          if (elem.className.indexOf(filter.id) !== -1) {
            filter.remove = true;
          }
        });
      });
      _each(this.state.themeFilters, filter => {
        filter.active = false;
        filter.show = true;
        filter.remove = false;
        _each(updatedBooksElems, elem => {
          if (elem.className.indexOf(filter.id) !== -1) {
            filter.remove = true;
          }
        });
      });
    }

    // For clearing the filters and unselecting a filter.
    if (!storeState._filters.length) {
      _each(this.state.drivenByFilters, filter => {
        filter.active = false;
        filter.show = true;
      });
      _each(this.state.themeFilters, filter => {
        filter.active = false;
        filter.show = true;
      });
    } else {
      _each(bookElems, elem => {
        let n = storeState._filters.length,
          filters,
          classes = elem.className;

        if (classes.indexOf(age) !== -1 || 
            (params && params.type && (params.type === 'childrens' || params.type === 'ya'))) {
          _each(storeState._filters, filter => {
            if (classes.indexOf(filter) !== -1) {
              n -= 1;
            }
          });

          if (n === 0) {
            filters = classes.split(' ');
            filteredFilters = _union(filteredFilters, filters);
          }
        }
      });

      if (filteredFilters) {
        _each(this.state.themeFilters, filter => {
          filter.show = true;
          if (_indexOf(filteredFilters, filter.id) === -1) {
            filter.show = false;
          }
        });
        _each(this.state.drivenByFilters, filter => {
          filter.show = true;
          if (_indexOf(filteredFilters, filter.id) === -1) {
            filter.show = false;
          }
        });
      }
    }

    this.setState(_extend({
      filters: activeFilters
    }, BookStore.getState()));
  }

  _clearFilters(e) {
    e.preventDefault();
    BookActions.clearFilters();

    utils._trackPicks('Filters', 'Clear All Filters');
  }

  _handleClick(filter) {
    let label = '';

    if (!filter.active) {
      label = `Selected filter: ${filter.id}`;
    } else {
      label = `Unselected filter: ${filter.id}`;
    }

    utils._trackPicks('Filters', label);

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
  }
};

export default Radium(BookFilters);
