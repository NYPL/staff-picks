import React from 'react';

import CloseButton from 'components/Books/CloseButton.jsx';
import Book from 'components/Book/Book.jsx';
import BookContent from 'components/BookContent/BookContent.jsx';
import BookTitle from 'components/BookContent/BookTitle.jsx';
import BookIntro from 'components/BookContent/BookIntro.jsx';
import BookShare from 'components/BookContent/BookShare.jsx';
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
        <div key='ImageContainer' style={styles.ImageContainer}>
          <Book book={this.state.book} height={'auto'} width={'90%'} />
        </div>
        <div key='ShareContainer' style={styles.ShareContainer}>
          <BookShare book={this.state.book} />
        </div>
        <BookIntro book={this.state.book} />
        <BookContent book={this.state.book} style={styles.ModalBookContent}/>
      </Modal>
    );
  }
});

const styles={
  ModalBookContent: {
  },
  ImageContainer: {
    '@media (max-width: 414px)': {
      position: 'relative',
      top: '0'
    },
    width: '30%', 
    display: 'inline-block', 
    margin: '-90px 0 0 0', 
    position: 'absolute', 
    top: '140px'
  },
  ShareContainer: {
    position:'relative', 
    top:'350px',
    '@media (max-width: 414px)': {
      top: '0'
    }
  }
}

export default Radium(BookModal);