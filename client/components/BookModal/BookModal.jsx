import React from 'react';
import DocMeta from 'react-doc-meta';
import _ from 'underscore';
import Radium from 'radium';
import Router from 'react-router';
import Modal from 'react-modal';

import CloseButton from '../Books/CloseButton.jsx';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import BookTitle from '../BookContent/BookTitle.jsx';
import BookIntro from '../BookContent/BookIntro.jsx';
import BookShare from '../BookContent/BookShare.jsx';

import API from '../../utils/ApiService.js';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

let Navigation = Router.Navigation;
let books = API.getBooks();

if (global.window) {
  Modal.setAppElement(document.getElementById('content'));
  Modal.injectCSS();
}

// class BookModal extends React.Component {
let BookModal = React.createClass({
  getInitialState() {
    let paramID = this.props.params.id,
      modalBook = {},
      age;

    if (!books.length) {
      if (this.props.data['staff-picks']) {
        books = this.props.data['staff-picks'];
      }
    }

    _.each(books, function (book) {
      if (book['item']['id'] === paramID) {
        modalBook = book;
        age = book['age'] ? book['age'].attributes.age : 'adult';
      }
    });

    BookActions.updateFilterAge(age);

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

  closeModal: function () {
    this.setState({
      modalIsOpen: false
    });
    this.transitionTo('/');
  },

  render: function() {
    let book = this.state.book,
      title = 'Staff Picks | The New York Public Library',
      imageSrc = '/client/images/staff_pic_bg.jpg',
      description = 'Every month NYPL\'s librarians share their favorite reads.',
      bookId,
      imageLink = `https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?` +
       `&userID=NYPL49807&password=CC68707&Value=${imageSrc}&content=M&Return=1&Type=M`;
    
    if (book['staff-pick-item']) {
      title = book['staff-pick-item']['attributes']['title'];
      description = book.attributes.text;
      imageSrc = book['staff-pick-item']['attributes']['image-slug'];
      bookId= book['staff-pick-item']['id'];
    }

    var tags = [
      {property: "og:title", content: title},
      {property: "og:type", content: 'website'},
      {property: "og:image", content: imageLink},
      {property: "og:description", content: description},
      {property: "og:site_name", content: 'Staff Picks | The New York Public Library'},
      {property: "og:url", content: `http://nypl.org/staff-picks/${bookId}`},
      {name: "twitter:card", content: 'summary_large_image'},
      {name: "twitter:site", content: '@nypl'},
      {name: "twitter:title", content: title},
      {name: "twitter:description", content: description},
      {name: "twitter:creator", content: '@nypl'},
      {name: "twitter:image", content: imageSrc}
    ];

    return (
      <div>
        <DocMeta tags={tags} />
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <CloseButton className='book-modal__close-btn' onClick={this.closeModal} />
          <BookTitle book={this.state.book} />
          <div style={styles.LeftColumn}>
            <div key='ImageContainer' className='ImageContainer' style={styles.ImageContainer}>
              <Book book={this.state.book} style={styles.BookCover} />
            </div>
            <div key='ShareContainer' className='ShareContainer' style={styles.ShareContainer}>
              <BookShare book={this.state.book} />
            </div>
          </div>
          <BookIntro book={this.state.book} />
          <BookContent book={this.state.book} style={styles.ModalBookContent}/>
        </Modal>
      </div>
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
      position: 'relative',
      width: '175px'
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
    cursor: 'default',
    width: '100%',
    height: 'auto',
    '@media (min-width: 414px)': {
      width: '237px'
    }
  }
}

export default Radium(BookModal);
