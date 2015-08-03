import React from 'react';
import Radium from 'radium';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import API from '../../utils/ApiService.js';
import CloseButton from './CloseButton.jsx';

import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import Router from 'react-router';

let Navigation = Router.Navigation;

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  bookData = API.getBooks();

// class Books extends React.Component {
var Books = React.createClass({
  getInitialState() {
    return {
      iso: null,
      book: {},
      books: bookData,
      modalIsOpen: false,
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge(),
      noResults: false
    };
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

    setTimeout(function () {
      _this.state.iso.arrange({
        filter: '.Adult'
      });
    }, 500);

    BookStore.addChangeListener(this._onChange);
    BookActions.updateNewFilters(this.state.iso.getItemElements());
  },

  componentDidUnmount () {
    BookStore.removeChangeListener(this._onChange);
  },

  _onChange () {
    let age = '.' + BookStore.getAge(),
      selector = age,
      _this = this;

    if (BookStore.getFilters().length) {
      selector += '.' + BookStore.getFilters().join('.');
    }

    setTimeout(function () {
      _this.state.iso.arrange({
        filter: selector
      });
    }, 100);

    this.state.iso.on('arrangeComplete', function (filteredItems) {
      if (!filteredItems.length) {
        _this.setState({
          noResults: true
        });
      }
    });

    this.setState({
      noResults: false,
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge()
    });
  },

  openModal (book) {
    this.transitionTo('modal', {id: book['staff-pick-item']['id']});
  },

  render () {
    const openModal = this.openModal,
      _this = this;

    let books;

    books = this.state.books.map(function (element, i) {
      let tags = _.map(element['staff-pick-item']['staff-pick-tag'], function (tag) {
          return tag.id;
        }),
        tagClasses = tags.join(' '),
        listWidth = _this.state.typeDisplay === 'list';

      return (
        <li className={'book-item ' + element['staff-pick-age']['attributes']['age'] + ' ' + tagClasses}
          key={element.id} onClick={openModal.bind(_this, element)}
          style={[
            listWidth ? styles.listWidth : styles.gridWidth
            ]}>
          {_this.state.typeDisplay === 'grid' ?
            <Book book={element} style={styles.bookItem} width={'100%'} /> :
            <div>
                <h2>{element['staff-pick-item']['attributes']['title']}</h2>
              <p>By: {element['staff-pick-item']['attributes']['author']}</p>
            </div>
          }
        </li>
      );
    });

    return (
      <div>
        <div className='month-picker' style={styles.monthPicker}>
          <a style={styles.previousMonth} onClick={this._handleClick}>
            Picks for June
            <span className='left-icon'></span>
          </a>

          <p style={styles.month}>July 2015</p>

          <a style={styles.nextMonth} onClick={this._handleClick}>
            Picks for August
            <span className='right-icon'></span>
          </a>
        </div>

        <div id="masonryContainer" ref="masonryContainer">
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

  _handleClick (e) {
    e.preventDefault();
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
    width: '250px',
    height: '410px'
  },
  showNoResults: {
    display: 'inline-block',
    fontSize: '14px'
  },
  hideNoResults: {
    display: 'none'
  },
  bookItem: {
    marginBottom: '20px'
  },
  monthPicker: {
    height: '35px',
    paddingTop: '7px'
  },
  month: {
    display: 'inline-block',
    marginLeft: '44%',
    color: '#333333'
  },
  nextMonth: {
    float: 'right'
  },
  previousMonth: {
    marginLeft: '27px'
  }
};

export default Radium(Books);
