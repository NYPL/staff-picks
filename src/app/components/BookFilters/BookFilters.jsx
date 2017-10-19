import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import {
  each as _each,
  extend as _extend,
  indexOf as _indexOf,
  union as _union,
  contains as _contains,
  sortBy as _sortBy,
} from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';
import CloseButton from '../Buttons/CloseButton.jsx';

import utils from '../../utils/utils.js';
import staffPicksDate from '../../utils/DateService.js';

const styles = {
  clearFilters: {
    color: '#0095c8',
    marginTop: '20px',
  },
  grayedOutFilter: {
    color: '#bfbfbf',
  },
};

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.setFilters();

    this.clearFilters = this.clearFilters.bind(this);
    this.onChange = this.onChange.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    const storeState = BookStore.getState();
    const activeFilters = storeState.filters;
    const bookElems = storeState.updatedFilters;
    const updatedBooksElems = [];
    let filteredFilters = [];

    // update filter list in state
    if (storeState.isotopesDidUpdate) {
      this.setFilters();
    }

    // For clearing the filters and unselecting a filter.
    if (!storeState.filters.length) {
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
        const classes = elem.className;
        let n = storeState.filters.length;
        let filters;

        if (this.props.annualList) {
          _each(storeState.filters, filter => {
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
      filters: activeFilters,
    }, BookStore.getState()));
  }

  setFilters() {
    const store = BookStore.getState();
    const initialFilters = store.initialFilters;
    const themeFilters = [];
    const drivenByFilters = [];
    const seasonYear = staffPicksDate(store.currentMonthPicks.date);

    _each(initialFilters, filter => {
      const displayName = filter.attributes.tag;
      let updatedDisplayName =
        `${displayName.charAt(0).toUpperCase()}${displayName.substring(1).toLowerCase()}`;

      filter.active = false;
      filter.show = true;
      filter.remove = true;
      if (filter.attributes.tag.indexOf('Driven') !== -1) {
        // If it's Summer of newer, then 'Driven' should appear in the display name
        // but separated with a hypen.
        if (seasonYear.month !== 'Spring' && seasonYear.year >= 2016) {
          // The space is needed to update the display name from, for example:
          // 'Plot Driven' to 'Plot-driven'.
          filter.attributes.displayName = updatedDisplayName.replace(/\b Driven/ig, '-driven');
        } else {
          filter.attributes.displayName = updatedDisplayName.replace(/\bDriven/ig, '');
        }

        drivenByFilters.push(filter);
      } else {
        filter.attributes.displayName = updatedDisplayName;
        themeFilters.push(filter);
      }
    });

    this.state = _extend({
      drivenByFilters,
      themeFilters,
    }, BookStore.getState());
  }

  filterItems(list) {
    const handleClick = this.handleClick;

    return list.map((elem) => {
      let active = 'hide-filter';
      let liElement;

      if (elem.active) {
        active = 'show-filter';
      }

      if (elem.show) {
        liElement = (
          <li key={elem.id} onClick={() => handleClick(elem)}>
            <a>
              {elem.attributes.displayName}
              <CSSTransitionGroup
                transitionName="minus"
                transitionAppear
                transitionEnterTimeout={500}
                transitionAppearTimeout={500}
                transitionLeaveTimeout={500}
              >
                <span className={`minus-icon ${active}`}></span>
              </CSSTransitionGroup>
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

  clearFilters(e) {
    e.preventDefault();
    BookActions.clearFilters();

    utils.trackPicks('Filters', 'Clear All Filters');
  }

  handleClick(filter) {
    const filterType = filter.id;
    let label = '';

    if (!filter.active) {
      label = `Selected filter: ${filterType}`;
    } else {
      label = `Unselected filter: ${filterType}`;
    }

    utils.trackPicks('Filters', label);

    filter.active = !filter.active;
    BookActions.toggleBookFilter(filterType);
  }

  renderFilterList(date) {
    const isSpring2016 = (date.year === 2016 && date.month === 'Spring');

    if (date.year >= 2016 && !isSpring2016) {
      let joinedFilters = this.state.drivenByFilters.concat(this.state.themeFilters);

      // Join the two set of filters and sort alphabetically.
      joinedFilters = _sortBy(joinedFilters, (f) => f.attributes.displayName);
      return (
        <ul>
          {this.filterItems(joinedFilters)}
        </ul>
      );
    }

    return (
      <div>
        <span>Driven by...</span>
        <ul>
          {this.filterItems(this.state.drivenByFilters)}
        </ul>
        <span>Themes...</span>
        <ul>
          {this.filterItems(this.state.themeFilters)}
        </ul>
      </div>
    );
  }

  render() {
    const store = BookStore.getState();
    const seasonYear = staffPicksDate(store.currentMonthPicks.date);

    return (
      <div className={`BookFilters ${this.props.active}`}>
        <CloseButton
          onClick={this.props.mobileCloseBtn}
          id="close-button"
          className="BookFilters__close-btn"
        />
        <span className="divider"></span>
        <h2>What would you like to read?</h2>
        <div className="BookFilters-lists">
          {this.renderFilterList(seasonYear)}
          {store.filters.length ?
            <div className="clearFilters" style={styles.clearFilters}>
              <a href="#" onClick={this.clearFilters}>
                Clear Filters
                <span className="close-icon"></span>
              </a>
            </div>
            : null
          }
          <h2 className="mobile-done-button">
            <a onClick={this.props.mobileCloseBtn}>
              Done
            </a>
          </h2>
        </div>
      </div>
    );
  }
}

BookFilters.propTypes = {
  mobileCloseBtn: PropTypes.func,
  active: PropTypes.string,
  annualList: PropTypes.bool,
};

export default BookFilters;
