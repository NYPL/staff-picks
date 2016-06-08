import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import Modal from 'react-modal';

import DocMeta from 'react-doc-meta';
import { each as _each } from 'underscore';

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

let BookModal = React.createClass({
    routeHandler(url) {
      this.context.router.push(url);
    },

    getInitialState() {
      let paramID = this.props.params.id,
        modalBook = {},
        store = BookStore.getState(),
        books = store._currentMonthPicks.picks,
        params = this.props.params,
        returnToText = 'RETURN TO STAFF PICKS',
        annualType,
        transitionRoute,
        age;

      if (!books && !books.length) {
        if (this.props.data['staff-picks']) {
          books = this.props.data['staff-picks'];
        }
      }

      _each(books, (book) => {
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

        if (params.type === 'childrens') {
          returnToText = 'RETURN TO CHILDREN\'S BOOKS';
        } else {
          returnToText = 'RETURN TO BOOKS FOR TEENS';
        }
      }

      return {
        modalIsOpen: true,
        book: modalBook,
        transitionRoute,
        annualType,
        returnToText
      };
    },

    openModal() {
      utils._trackPicks('Modal', 'Open');

      this.setState({
        modalIsOpen: true
      });
    },

    closeModal() {
      utils._trackPicks('Modal', 'Closed');

      this.setState({
        modalIsOpen: false
      });
      setTimeout(() => {

        let returnUrl = this.props.params.month;

        /* special cases for young adults and children */
        if (this.props.params.type && (this.props.params.type === 'ya' || this.props.params.type === 'childrens')) {
          returnUrl = `annual/${this.props.params.type}`;
        }

        return this.routeHandler('/browse/recommendations/staff-picks/' + returnUrl);
      }, 200);
    },

    _getMetaData(selection) {
      let type = 'staffpicks';

      if (selection && selection.length) {
        type = selection;
      }

      let heroData = {
        staffpicks: {
          type: 'staffpicks',
          title: 'RECOMMENDATIONS',
          description: 'Staff Picks',
          intro: 'True stories, tales of courage, historical romances, ' +
            'edge-of-your-seat thrillers... There is a huge world of books ' +
            'out there. Our expert staff members pick out their favorites ' +
            'to help you find your next one.',
          image: '/browse/recommendations/staff-picks/src/client/images/shelftalker.4.2.png',
          url: 'http://www.nypl.org/browse/recommendations/staff-picks/'
        },
        childrens: {
          type: 'childrens',
          title: 'RECOMMENDATIONS',
          description: 'Children\'s Books',
          intro: 'Explore our annual selection of 100 notable titles for reading and sharing.',
          image: '/browse/recommendations/staff-picks/src/client/images/desktop.childrens100.FIN.png',
          url: 'http://www.nypl.org/browse/recommendations/staff-picks/annual/childrens'
        },
        ya: {
          type: 'ya',
          title: 'RECOMMENDATIONS',
          description: 'Best Books for Teens',
          intro: 'Explore our annual selection of outstanding young adult titles.',
          image: '/browse/recommendations/staff-picks/src/client/images/desktop.banner.YA.FIN.png',
          url: 'http://www.nypl.org/browse/recommendations/staff-picks/annual/ya'
        }
      };

      return heroData[type];
    },

    render() {
      let book = this.state.book,
        title = 'Recommendations | The New York Public Library',
        imageSrc = '/browse/recommendations/staff-picks/src/client/images/shelftalker.4.2.png',
        description = 'True stories, tales of courage, historical romances, ' +
          'edge-of-your-seat thrillers... There is a huge world of books ' +
          'out there. Our expert staff members pick out their favorites ' +
          'to help you find your next one.',
        bookId,
        metaType,
        metaTagData,
        imageLink;

      if (!this.state.annualType) {
        metaType = 'staffpicks';
      } else {
        metaType = this.state.annualType.type;
      }

      metaTagData = this._getMetaData(metaType);
      
      description = metaTagData.intro;

      if (book.item) {
        title = book.item.title;
        description = book.text;
        imageSrc = book.item.imageSlug;
        bookId= book.item.id;
      }

      imageLink = `https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?` +
        `&userID=NYPL49807&password=CC68707&Value=${imageSrc}&content=M&Return=1&Type=M`;

      let modalTags = [
        {property: 'og:title', content: title},
        {property: 'og:image', content: imageLink},
        {property: 'og:description', content: description},
        {property: 'og:url', content: `${metaTagData.url}/${bookId}`},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        {name: 'twitter:image', content: imageLink}
        ],
        tags = utils.metaTagUnion(modalTags);

      return (
        <div>
          <DocMeta tags={tags} />
          <Modal className={this.props.className} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <CloseButton
              className={`${this.props.className}__closeBtn`}
              onClick={this.closeModal}
              label={this.state.returnToText} />
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
                  shareType={this.state.annualType}
                  className={`${this.props.className}__left-column__share-items`}
                  book={this.state.book} />
              </div>
            </div>
            <BookIntro book={this.state.book} />
            <BookContent book={this.state.book} type={this.state.transitionRoute} />
          </Modal>
        </div>
      );
    }
  });

BookModal.defaultProps = {
  className: 'BookModal',
  id: 'BookModal'
};

BookModal.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

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
