import React from 'react';
import Radium from 'radium';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import API from '../../utils/ApiService.js';
import CloseButton from './CloseButton.jsx';
import parser from 'jsonapi-parserinator';

import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import Router from 'react-router';

let Navigation = Router.Navigation;

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import staffPicksDate from '../../utils/DateService.js';

// class Books extends React.Component {
var Books = React.createClass({
  getInitialState() {
    return _.extend({
      iso: null,
      book: {},
      books: [],
      modalIsOpen: false,
      noResults: false
    }, BookStore.getState());
  },

  mixins: [Navigation],

  componentDidMount() {
    // This needs to be set done once the component is available
    let grid = document.getElementById('masonryContainer');

    // this.setState does not work in this case because
    // iso.arrange also needs to be called.
    this.state.iso = new Isotope(grid, {
      itemSelector: '.book-item',
      masonry: {
        columnWidth: 250,
        isResizable: true,
        isFitWidth: true,
        gutter: 10
      }
    });

    $('#masonryContainer').css('opacity', '1');
    this.state.iso.arrange({
      filter: '.Adult'
    });
    // setTimeout(() => {
      BookActions.updateNewFilters(this.state.iso.getItemElements());
      BookActions.updateFilterAge('Adult');
    // }, 100);

    BookStore.listen(this._onChange);
  },

  componentDidUnmount() {
    BookStore.unlisten(this._onChange);
  },

  componentDidUpdate() {
    let storeState = BookStore.getState(),
      age = '.' + storeState._age,
      filters = storeState._filters,
      selector = age,
      _this = this;

    if (filters.length) {
      selector += '.' + filters.join('.');
    }
    
    setTimeout(() => {
      this.state.iso.reloadItems();
      this.state.iso.arrange({
        filter: selector
      });
    }, 200);
  },


  _onChange() {
    let storeState = BookStore.getState(),
      age = '.' + storeState._age,
      filters = storeState._filters,
      selector = age,
      _this = this;

    if (filters.length) {
      selector += '.' + filters.join('.');
    }

    // setTimeout(() => {
      // console.log(selector);
      _this.state.iso.arrange({
        filter: selector
      });
    // }, 100);

    this.state.iso.on('arrangeComplete', filteredItems => {
      if (!filteredItems.length) {
        _this.setState({
          noResults: true
        });
      }
    });

    this.setState(_.extend({
      noResults: false,
    }, BookStore.getState()));
  },

  _openModal(book) {
    this.transitionTo('modal', {
      month: this.state._currentMonthPicks.date,
      id: book['item']['id']
    });
  },

  _getTags(elem) {
    return elem['item']['tags'] || [];
  },

  _getAge(elem) {
    if (!elem['age']) {
      return;
    }
    return elem['age']['attributes']['age'];
  },

  render () {
    console.log('render');
    const openModal = this._openModal,
      _this = this;

    let books, months, pickDate, date, thisMonth, thisyear,
      nextMonth, previousMonth, previousLink, nextLink;

    let currentMonthPicks = this.state._currentMonthPicks;

    let picks = currentMonthPicks.picks;

    books = picks.map((element, i) => {
      let tagList = _this._getTags(element),
        age = _this._getAge(element),
        tagIDs = _.map(tagList, tag => {
          return tag.id;
        }),
        tagClasses = tagIDs.join(' '),
        listDisplay = _this.state._bookDisplay === 'list';

      return (
        <li className={'book-item ' + age + ' ' + tagClasses}
          key={element.id} onClick={openModal.bind(_this, element)}
          style={[listDisplay ? styles.listWidth : styles.gridWidth]}>
          {_this.state._bookDisplay === 'grid' ?
            <Book book={element} className='book' /> :
            <div>
                <h2>{element['item']['attributes']['title']}</h2>
              <p>By: {element['item']['attributes']['author']}</p>
            </div>
          }
        </li>
      );
    });

    months = ['January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    pickDate = currentMonthPicks.date;
    date = staffPicksDate(pickDate);
    thisMonth = date.month;
    thisyear = date.year;

    let previousMonthDate = currentMonthPicks.previousList['list-date'];
    let nextMonthDate = currentMonthPicks.nextList['list-date'];

    previousMonth = {
      active: !_.isEmpty(currentMonthPicks.previousList),
      date: previousMonthDate,
      month: () => {
        if (_.isEmpty(currentMonthPicks.previousList)) {
          return;
        }
        return staffPicksDate(previousMonthDate).month;
      }
    };
    nextMonth = {
      active: !_.isEmpty(currentMonthPicks.nextList),
      date: nextMonthDate,
      month: () => {
        if (_.isEmpty(currentMonthPicks.nextList)) {
          return;
        }
        return staffPicksDate(nextMonthDate).month;
      }
    };

    previousLink = previousMonth.active ? (
      <a style={styles.previousMonth} onClick={this._handleClick.bind(this, previousMonth.date)}>
        Picks for {previousMonth.month()}<span className='left-icon'></span>
      </a>
    ) : null;
    nextLink = nextMonth.active ? (
      <a style={styles.nextMonth} onClick={this._handleClick.bind(this, nextMonth.date)}>
        Picks for {nextMonth.month()}<span className='right-icon'></span>
      </a>
    ) : null;

    return (
      <div>
        <div className='month-picker' style={styles.monthPicker}>
          {previousLink}<p style={styles.month}>{thisMonth} {thisyear}</p>{nextLink}
        </div>

        <div id="masonryContainer" ref="masonryContainer" style={{opacity: '0'}}>
          <ul className='list-view'>
            <ReactCSSTransitionGroup transitionName='books' transitionAppear={true}>
              {books}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
        <p style={[
          this.state.noResults ? styles.showNoResults : styles.hideNoResults
          ]}>
          No results are available for this age category.
        </p>
      </div>
    );
  },

  _handleClick (month) {
    let API = '/api/ajax/picks/' + month;
    if (month) {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: API,
        success: function (data) {
          BookActions.updatePicks(data);
        }
      });
    }
  }
});

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {},
  listWidth: {
    width: '100%',
    marginBottom: '20px'
  },
  gridWidth: {
    width: '250px'
  },
  showNoResults: {
    display: 'inline-block',
    fontSize: '14px'
  },
  hideNoResults: {
    display: 'none'
  },
  monthPicker: {
    height: '35px',
    marginLeft: '-23px',
    paddingTop: '7px',
    textAlign: 'center'
  },
  month: {
    display: 'inline-block',
    color: '#333333',
    marginLeft: '25px',
    '@media (min-width: 600px)': { marginLeft: '0' }
  },
  nextMonth: {
    float: 'right'
  },
  previousMonth: {
    float: 'left',
    width: '100px'
  }
};

export default Radium(Books);
