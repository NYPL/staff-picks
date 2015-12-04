import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import Modal from 'react-modal';

import DocMeta from 'react-doc-meta';
import _ from 'underscore';

import CloseButton from '../Buttons/CloseButton.jsx';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import BookTitle from '../BookContent/BookTitle.jsx';
import BookIntro from '../BookContent/BookIntro.jsx';
import BookShare from '../BookContent/BookShare.jsx';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import utils from '../../utils/utils.js';

if (global.window) {
  Modal.setAppElement(document.getElementById('content'));
  Modal.injectCSS();
}

let Navigation = Router.Navigation,
  BookModal = React.createClass({
    getInitialState() {
      let paramID = this.props.params.id,
        modalBook = {},
        store = BookStore.getState(),
        books = store._currentMonthPicks.picks,
        params = this.props.params,
        annualType,
        transitionRoute,
        age;

      if (!books.length) {
        if (this.props.data['staff-picks']) {
          books = this.props.data['staff-picks'];
        }
      }

      _.each(books, (book) => {
        if (book.item.id === paramID) {
          modalBook = book;
          age = book.age ? book.age.age : 'adult';
        }
      });

      BookActions.updateFilterAge(age);


      if (!params.type && (params.month === undefined || params.month.length)) {
        transitionRoute = 'home';
      }

      if (params.type && (params.type === 'childrens' || params.type === 'ya')) {
        transitionRoute = 'type';
        annualType = {type: params.type};
      }

      return {
        modalIsOpen: true,
        book: modalBook,
        transitionRoute,
        annualType
      };
    },

    mixins: [Navigation],

    openModal() {
      utils._trackPicks('Modal', 'Open');

      this.setState({
        modalIsOpen: true
      });
    },

    closeModal() {
      utils._trackPicks('Modal', 'Closed');

      let transitionRoute;
      let params = this.props.params;


      this.setState({
        modalIsOpen: false
      });
      setTimeout(() => {
        return this.transitionTo(this.state.transitionRoute, this.state.annualType);
      }, 200);
    },

    render() {
      let book = this.state.book,
        title = 'Staff Picks | The New York Public Library',
        imageSrc = '/client/images/staff_pic_bg.jpg',
        description = 'Every month, NYPL\'s book experts share 100 titles they love.',
        bookId,
        imageLink;
      
      if (book.item) {
        title = book.item.title;
        description = book.text;
        imageSrc = book.item.imageSlug;
        bookId= book.item.id;
      }

      imageLink = `https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?` +
        `&userID=NYPL49807&password=CC68707&Value=${imageSrc}&content=M&Return=1&Type=M`;

      let modalTags = [
          {property: "og:title", content: title},
          {property: "og:image", content: imageLink},
          {property: "og:description", content: description},
          {property: "og:url", content: `http://www.nypl.org/browse/recommendations/staff-picks/${bookId}`},
          {name: "twitter:title", content: title},
          {name: "twitter:description", content: description},
          {name: "twitter:image", content: imageLink}
        ],
        tags = utils.metaTagUnion(modalTags);

      return (
        <div>
          <DocMeta tags={tags} />
          <Modal className={this.props.className} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <CloseButton
              className={`${this.props.className}__closeBtn`}
              onClick={this.closeModal}
              label='RETURN TO STAFF PICKS' />
            <BookTitle className={`${this.props.className}__BookTitle`} book={this.state.book} />
            <div className={`${this.props.className}__left-column`}>
              <div key='ImageContainer' className={`${this.props.className}__left-column__image`}>
                <Book
                  book={this.state.book}
                  className={`${this.props.className}__left-column__image__cover`}
                  style={styles.BookCover} />
              </div>
              <div key='ShareContainer' className={`${this.props.className}__left-column__share`}>
                <BookShare
                  className={`${this.props.className}__left-column__share-items`}
                  book={this.state.book} />
              </div>
            </div>
            <BookIntro book={this.state.book} />
            <BookContent book={this.state.book} />
          </Modal>
        </div>
      );
    }
  });

BookModal.defaultProps = {
  className: 'BookModal',
  id: 'BookModal'
}

const styles={
  BookCover: {
    width: '100%',
    height: 'auto',
    '@media (min-width: 414px)': {
      width: '237px'
    }
  }
};

export default Radium(BookModal);
