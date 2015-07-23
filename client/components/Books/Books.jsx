import React from 'react';
import Radium from 'radium';
import MasonryMixin from 'react-masonry-mixin';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import API from '../../utils/ApiService.js';
import CloseButton from 'components/Books/CloseButton.jsx';

import Modal from 'react-modal';
import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

let bookContainer = document.getElementById('books');
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Modal.setAppElement(bookContainer);
Modal.injectCSS();

let bookData = API.getBooks();

let masonryOptions = {
  isResizable: true,
  isFitWidth: false,
  columnWidth: 175,
  itemSelector: '.book-item',
  gutter: 30
};
var iso;

// class Books extends React.Component {
var Books = React.createClass({
  getInitialState: function () {
    return {
      book: {},
      books: bookData,
      modalIsOpen: false,
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge()
    }
  },

  componentDidMount: function () {
    var grid = document.getElementById('masonryContainer');
    iso = new Isotope(grid, {
      itemSelector: '.book-item',
      masonry: {
        columnWidth: 175,
        gutter: 30
      }
    });
    iso.arrange({
      filter: '.Adult'
    });

    BookStore.addChangeListener(this.onChange.bind(this));
  },

  componentDidUnmount: function () {
    BookStore.removeChangeListener(this.onChange.bind(this));
  },

  onChange: function () {
    console.log(BookStore.getFilters());
    var selector = '.' + BookStore.getAge();

    iso.arrange({
      filter: selector
    });

    this.setState({
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge()
    });
    // var changedAge = BookStore.getAge();
    // var books = [];
    // bookData.forEach(function (element) {
    //   if (element['staff-pick-age']['attributes']['age'] === changedAge) {
    //     books.push(element);
    //   }
    // });

  },

  // mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  openModal: function (book) {
    console.log(book)
    this.setState({
      book: book,
      modalIsOpen: true
    });
  },

  closeModal: function (e) {
    e.preventDefault();
    this.setState({
      book: {},
      modalIsOpen: false
    });
  },

  render: function () {
    var openModal = this.openModal;

    var _this = this;

    var books = this.state.books.map(function (element, i) {
      var tags = _.map(element['staff-pick-item']['staff-pick-tag'], function (tag) {
        return tag.id;
      });
      var tagClasses = tags.join(' ');

      return (
        <div className={'book-item ' + element['staff-pick-age']['attributes']['age'] + ' ' + tagClasses}
          onClick={openModal.bind(_this, element)} key={element.id}>
          <Book book={element} style={styles.bookItem} height={'270px'} width={'175px'} />
        </div>
      );
    });

    var booksLists = this.state.books.map(function (element, i) {
      return (
        <li className='book-item' key={i}>
          <h2 onClick={openModal.bind(_this, element)}>{element['staff-pick-item']['attributes']['title']}</h2>
          <p>By: {element['staff-pick-item']['attributes']['author']}</p>
        </li>
      );
    });
    var gridDisplay, listDisplay;

    if (this.state.typeDisplay === 'grid') {
      gridDisplay = 'block';
      listDisplay = 'none';
    } else {
      gridDisplay = 'none';
      listDisplay = 'block';
    }

    return (
      <div>
        <div className='month-picker' style={styles.monthPicker}>
          <a href='#' style={styles.previousMonth} onClick={this._handleClick}>
            Picks for June
            <span className='left-icon'></span>
          </a>

          <p style={styles.month}> July 2015</p>

          <a href='#' style={styles.nextMonth} onClick={this._handleClick}>
            Picks for August
            <span className='right-icon'></span>
          </a>
        </div>

        <div id="masonryContainer" ref="masonryContainer" style={{'width':'100%', 'display': gridDisplay}}>
          {books}
        </div>
        <div style={{'display': listDisplay}}>
          <ul className='list-view'>
            {booksLists}
          </ul>
        </div>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <CloseButton onClick={this.closeModal} />
          <div style={{'width':'30%', 'display':'inline-block'}}>
            <Book book={this.state.book}  />
          </div>
          <BookContent book={this.state.book} />
        </Modal>
      </div>
    );
  },

  _handleClick: function (e) {
    e.preventDefault();
  }
});

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {

  },
  bookItem: {
    marginBottom: '20px',
    maxWidth: '200px'
  },
  monthPicker: {
    height: '35px',
    paddingTop: '7px'
  },
  month: {
    display: 'inline-block',
    marginLeft: '44%',
    color: '#0095c8'
  },
  nextMonth: {
    float: 'right'
  },
  previousMonth: {
    marginLeft: '27px'
  }
};

export default Radium(Books);
