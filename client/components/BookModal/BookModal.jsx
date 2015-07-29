import React from 'react';

import CloseButton from 'components/Books/CloseButton.jsx';
import Book from 'components/Book/Book.jsx';
import BookContent from 'components/BookContent/BookContent.jsx';
import BookTitle from 'components/BookContent/BookTitle.jsx';
import _ from 'underscore';
import Radium from 'radium';
import Router from 'react-router';
import Modal from 'react-modal';
import API from '../../utils/ApiService.js';

let Navigation = Router.Navigation;

const books = API.getBooks();


Modal.setAppElement(document.getElementById('content'));
Modal.injectCSS();

// class BookModal extends React.Component {
var BookModal = React.createClass({
  getInitialState() {
    let paramID = this.props.params.id,
      modalBook = {};

    _.each(books, function (book) {
      if (book['staff-pick-item']['id'] === paramID) {
        modalBook = book;
      }
    });

    return {
      modalIsOpen: true,
      book: modalBook
    };
  },

  mixins: [Navigation],

  openModal: function () {
    this.setState({
      modalIsOpen: true
    });
  },

  closeModal:function () {
    this.setState({
      modalIsOpen: false
    });
    this.transitionTo('/');
  },
  render: function() {
    return (
      <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
        <CloseButton onClick={this.closeModal} />
        <BookTitle book={this.state.book} />
        <div style={{'width':'30%', 'display':'inline-block'}}>
          <Book book={this.state.book}  />
        </div>
        <BookContent book={this.state.book} />
      </Modal>
    );
  }
});

export default Radium(BookModal);