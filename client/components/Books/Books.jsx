import React from 'react';
import Radium from 'radium';
import MasonryMixin from 'react-masonry-mixin';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import API from '../../utils/ApiService.js';

import Modal from '../modal/modal.js';

let bookContainer = document.getElementById('books');

Modal.setAppElement(bookContainer);
Modal.injectCSS();

let bookData = API.getBooks();
console.log(bookData);

let masonryOptions = {
  isResizable: true,
  isFitWidth: false,
  columnWidth: 150,
  itemSelector: '.book-item',
  gutter: 20
};

// class Books extends React.Component {
var Books = React.createClass({
  getInitialState: function () {
    return {
      book: {},
      modalIsOpen: false
    }
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

    var books = bookData['staff-picks'].map(function (element) {
      return (
        <div className='book-item'
          onClick={openModal.bind(_this, element)}>
          <Book book={element} style={styles.bookItem}
            height={'250px'} width={'150px'} />
        </div>
      );
    });

    return (
      <div ref="masonryContainer" style={{'width':'100%'}}>
        {books}
        <Modal isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}>
          <div style={{'width':'30%', 'display':'inline-block'}}>
            <Book book={this.state.book} height={'350px'} width={'240px'} />
          </div>
          <BookContent book={this.state.book} />
        </Modal>
      </div>
    );
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
  }
};

export default Radium(Books);
