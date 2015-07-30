import React from 'react';
import Radium from 'radium';
import cx from 'classnames';
import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import API from '../../utils/ApiService.js';

import Modal from 'react-modal';

let bookContainer = document.getElementById('sidebar');
Modal.setAppElement(bookContainer);
Modal.injectCSS();

import { Link } from 'react-router';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayType: BookStore.getBookDisplay(),
      gridActive: BookStore.getActiveGrid(),
      listActive: BookStore.getActiveList(),
      filters: BookStore.getFilters(),
      age: BookStore.getAge()
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
      let active = 'hide-filter',
        liElement;
      if (elem.active) {
        active = 'show-filter';
      }

      if (elem.show) {
        liElement = (
          <li key={elem.id} onClick={_handleClick.bind(_this, elem)}>
            <a >
              {elem.attributes.tag}
              <ReactCSSTransitionGroup transitionName='minus' transitionAppear={true}>
                <span className={'minus-icon ' + active}></span>
              </ReactCSSTransitionGroup>
            </a>
          </li>
        );
      } else {
        liElement = (
          <li key={elem.id} style={styles.grayedOutFilter}>{elem.attributes.tag}</li>
        );
      }

      return elem.remove ? liElement : null;
      // <Link to='/' onClick={_handleClick.bind(_this, elem)} query={{filters: elem.attributes.tag}}>
    });
  }

  render () {
    return (
      <div className='BookFilters' style={this.props.styles}>
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
}

class Sidebar extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal (book) {
    this.setState({
      book: book,
      modalIsOpen: true
    });
  }

  closeModal () {
    this.setState({
      book: {},
      modalIsOpen: false
    });
  }

  render () {
    return (
      <div ref='sidebar' className='sidebar-content'>
        <BookDisplayButtons />
        <h2 className='mobile-filter-btn'><a href='#' onClick={this.openModal}>Filter By Tags</a></h2>
        <BookFilters />
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <BookFilters styles={styles.filterModal}/>
        </Modal>
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
  },
  filterModal: {
    display: 'block'
  },
  grayedOutFilter: {
    color: '#bfbfbf'
  }
};

export default Radium(Sidebar);
