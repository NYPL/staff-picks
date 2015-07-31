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

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

let Navigation = Router.Navigation;

const books = API.getBooks();


Modal.setAppElement(document.getElementById('content'));
Modal.injectCSS();

// class BookModal extends React.Component {
var BookModal = React.createClass({
  getInitialState() {
    let paramID = this.props.params.id,
      modalBook = {},
      age;

    _.each(books, function (book) {
      if (book['staff-pick-item']['id'] === paramID) {
        modalBook = book;
        age = book['staff-pick-age'].attributes.age;
      }
    });

    BookActions.updateFilterAge(age);

    return {
      modalIsOpen: true,
      book: modalBook,
      age: age
    };
  },

  mixins: [Navigation],

  openModal: function () {
    this.setState({
      modalIsOpen: true
    });
  },

  closeModal: function () {
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
        <div style={styles.LeftColumn}>
          <div key='ImageContainer' style={styles.ImageContainer}>
            <Book book={this.state.book} style={styles.BookCover} />
          </div>
          <div key='ShareContainer' style={styles.ShareContainer}>
            <BookShare book={this.state.book} />
          </div>
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
  LeftColumn: {
    position: 'absolute',
    top: '20px',
    '@media (max-width: 414px)': {
      float: 'left',     
      margin: '30px 0 10px 0',
      position: 'relative',
      top:'0'
    }
  },
  ImageContainer: {
    margin: '36px 0 0 0', 
    position: 'relative', 
    '@media (max-width: 414px)': {
      margin: '0', 
      position: 'relative'
    }
  },
  ShareContainer: {
    position:'relative',
    margin: '20px 0 0 0', 
    top:'0',
    '@media (max-width: 414px)': {
      margin: '6px 0 0 0'
    }
  },
  BookCover: {
    width: '237px',
    height: 'auto',
    '@media (max-width: 414px)': {
      width: '80%'
    }
  }
}

export default Radium(BookModal);