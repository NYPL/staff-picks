import React from 'react';
import radium from 'radium';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  each as _each,
  extend as _extend,
  indexOf as _indexOf,
  union as _union,
} from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';
import CloseButton from '../Buttons/CloseButton.jsx';

import utils from '../../utils/utils.js';

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
    // Only trigger the Action for the /browse/recommendations/staff-picks route.
    if (this.props.params && !this.props.params.type) {
      BookActions.updateFilterAge('adult');
    }

    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    const storeState = BookStore.getState();
    const activeFilters = storeState._filters;
    const age = storeState._age;
    const params = this.props.params;
    const bookElems = storeState._updatedFilters;
    const updatedBooksElems = [];
    let filteredFilters = [];

    _each(bookElems, elem => {
      if (elem.className.indexOf(age) !== -1) {
        updatedBooksElems.push(elem);
      }
    });

    // update filter list in state
    if (storeState._isotopesDidUpdate) {
      this.setFilters();
    }

    // Update/reset the filters based on a new age
    if (this.state._age !== age || storeState._isotopesDidUpdate) {
      this.setState({ _age: age });
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
        const classes = elem.className;
        let n = storeState._filters.length;
        let filters;

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
      filters: activeFilters,
    }, BookStore.getState()));
  }

  setFilters() {
    const store = BookStore.getState();
    const filterList = store._initialFilters;
    const themeFilters = [];
    const drivenByFilters = [];

    _each(filterList, filter => {
      filter.active = false;
      filter.show = true;
      filter.remove = true;
      if (filter.attributes.tag.indexOf('Driven') !== -1) {
        filter.attributes.displayName = (filter.attributes.tag).replace(/\bDriven/ig, '');
        drivenByFilters.push(filter);
      } else {
        filter.attributes.displayName = filter.attributes.tag;
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
              <ReactCSSTransitionGroup
                transitionName="minus"
                transitionAppear={true}
                transitionEnterTimeout={500}
                transitionAppearTimeout={500}
                transitionLeaveTimeout={500}
              >
                <span className={`minus-icon ${active}`}></span>
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

  clearFilters(e) {
    e.preventDefault();
    BookActions.clearFilters();

    utils._trackPicks('Filters', 'Clear All Filters');
  }

  handleClick(filter) {
    const filterType = filter.id;
    let label = '';

    if (!filter.active) {
      label = `Selected filter: ${filterType}`;
    } else {
      label = `Unselected filter: ${filterType}`;
    }

    utils._trackPicks('Filters', label);

    filter.active = !filter.active;
    BookActions.toggleBookFilter(filterType);
  }

  render() {
    const storeState = BookStore.getState();

    return (
      <div className="BookFilters">
        <CloseButton
          onClick={this.props.mobileCloseBtn}
          id="close-button"
          className="BookFilters__close-btn"
        />
        <span className="divider"></span>
        <h2>What would you like to read?</h2>
        <div className="BookFilters-lists">
          <span>Driven by...</span>
          <ul>
            {this.filterItems(this.state.drivenByFilters)}
          </ul>
          <span>Themes...</span>
          <ul>
            {this.filterItems(this.state.themeFilters)}
          </ul>
          {storeState._filters.length ?
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
  params: React.PropTypes.object,
  styles: React.PropTypes.object,
  mobileCloseBtn: React.PropTypes.func,
};

export default radium(BookFilters);
