import React from 'react';
import Radium from 'radium';
import MasonryMixin from 'react-masonry-mixin';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import API from '../../utils/ApiService.js';
import CloseButton from 'components/Books/CloseButton.jsx';

import Modal from 'react-modal';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

let bookContainer = document.getElementById('books');

Modal.setAppElement(bookContainer);
Modal.injectCSS();

let bookData = API.getBooks();
console.log(bookData);

let masonryOptions = {
  isResizable: true,
  isFitWidth: false,
  columnWidth: 175,
  itemSelector: '.book-item',
  gutter: 30
};

// class Books extends React.Component {
var Books = React.createClass({
  getInitialState: function () {
    return {
      book: {},
      modalIsOpen: false,
      type: BookStore.getBookDisplay()
    }
  },

  componentDidMount: function () {
    BookStore.addChangeListener(this.onChange.bind(this));
  },

  componentDidUnmount: function () {

  },

  onChange: function () {
    this.setState({
      type: BookStore.getBookDisplay()
    });
  },

  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  openModal: function (book) {
    console.log(book);
    this.setState({
      book: book,
      modalIsOpen: true
    });
  },

  closeModal: function () {
    this.setState({
      book: {},
      modalIsOpen: false
    });
  },

  render: function () {
    var openModal = this.openModal;
    var _this = this;

    var books = bookData['staff-picks'].map(function (element, i) {
      return (
        <div className='book-item' onClick={openModal.bind(_this, element)} key={i} >
          <Book book={element} style={styles.bookItem}
            height={'270px'} width={'175px'} />
        </div>
      );
    });

    var booksLists = bookData['staff-picks'].map(function (element, i) {
      return (
        <li className='book-item' key={i}>
          <h2 onClick={openModal.bind(_this, element)}>{element['staff-pick-item']['attributes']['title']}</h2>
          <p>By: {element['staff-pick-item']['attributes']['author']}</p>
        </li>
      );
    });
    var gridDisplay, listDisplay;

    if (this.state.type === 'grid') {
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

          <p style={styles.month}> July 2015 </p>

          <a href='#' style={styles.nextMonth} onClick={this._handleClick}>
            Picks for August
            <span className='right-icon'></span>
          </a>
        </div>
        <div ref="masonryContainer" style={{'width':'100%', 'display': gridDisplay}}>
          {books}
        </div>
        <div style={{'display': listDisplay}}>
          <ul className='list-view'>
            {booksLists}
          </ul>
        </div>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <CloseButton />
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
    paddingTop: '6px'
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
    marginLeft: '25px'
  }
};

export default Radium(Books);
