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
let bookData = API.getBooks();
let currentList = API.getCurrentList();

// class Books extends React.Component {
var Books = React.createClass({
  getInitialState() {
    let books = this.props.books ? this.props.books['staff-picks'] : bookData['staff-picks'];

    let currentList = this.props.currentList || currentList;
    return _.extend({
      iso: null,
      book: {},
      currentList,
      books: books,
      modalIsOpen: false,
      noResults: false
    }, BookStore.getState());
  },

  mixins: [Navigation],

  componentDidMount () {
    // This needs to be set done once the component is available
    let grid = document.getElementById('masonryContainer'),
      _this = this;

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

    setTimeout(() => {
      _this.state.iso.arrange({
        filter: '.Adult'
      });
    }, 1200);

    BookStore.listen(this._onChange);
    BookActions.updateNewFilters(this.state.iso.getItemElements());
  },

  componentDidUnmount () {
    BookStore.unlisten(this._onChange);
  },

  _onChange () {
    let storeState = BookStore.getState(),
      age = '.' + storeState._age,
      filters = storeState._filters,
      selector = age,
      _this = this;

    if (filters.length) {
      selector += '.' + filters.join('.');
    }

    setTimeout(() => {
      _this.state.iso.arrange({
        filter: selector
      });
    }, 100);

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

  _openModal (book) {
    this.transitionTo('modal', {id: book['item']['id']});
  },

  _getTags (elem) {
    return elem['item']['staff-pick-tag'] || [];
  },

  _getAge (elem) {
    if (!elem['age']) {
      return;
    }
    return elem['age']['attributes']['age'];
  },

  render () {
    const openModal = this._openModal,
      _this = this;

    let books;

    books = this.state.books.map((element, i) => {
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

    let months, list, date, thisMonth, thisyear,
      nextHref, previousHref;
    if (this.state.currentList) {
      months = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      list = this.state.currentList;
      date = new Date(list.currentList['list-date']);
      thisMonth = months[date.getMonth() + 1];
      thisyear = date.getFullYear();

      previousHref = !_.isEmpty(list.previousList) ? list.previousList.links.self : undefined;
      nextHref = !_.isEmpty(list.nextList) ? list.nextList.links.self : undefined;
    }

    return (
      <div>
        <div className='month-picker' style={styles.monthPicker}>
          <a style={styles.previousMonth} onClick={this._handleClick.bind(this, previousHref)}>
            Picks for June
            <span className='left-icon'></span>
          </a>

          <p style={styles.month}>{thisMonth} {thisyear}</p>

          <a style={styles.nextMonth} onClick={this._handleClick.bind(this, nextHref)}>
            Picks for August
            <span className='right-icon'></span>
          </a>
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

  _handleClick (API) {
    if (API) {
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: API + '?include=previous-list,next-list,picks.item.tags,picks.age',
        success: function (data) {
          console.log(parser.parse(data));

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
