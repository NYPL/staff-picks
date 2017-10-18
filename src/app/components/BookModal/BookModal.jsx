import React from 'react';
import PropTypes from 'prop-types';
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

import utils from '../../utils/utils.js';
import config from '../../../../appConfig.js';

const { baseUrl } = config;

if (global.window) {
  Modal.setAppElement(document.getElementById('content'));
  Modal.injectCSS();
}

class BookModal extends React.Component {
  constructor(props) {
    super(props);

    const paramID = this.props.params.id;
    const store = BookStore.getState();
    const params = this.props.params;
    let books = store.currentMonthPicks.picks;
    let modalBook = {};
    let returnToText = 'RETURN TO STAFF PICKS';
    let annualType;
    let transitionRoute;
    let age;

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

    if (!params.type && (params.month === undefined || params.month.length)) {
      transitionRoute = 'home';
    }

    if (params.type && (params.type === 'childrens' || params.type === 'ya')) {
      transitionRoute = 'type';
      annualType = { type: params.type };

      if (params.type === 'childrens') {
        returnToText = 'RETURN TO CHILDREN\'S BOOKS';
      } else {
        returnToText = 'RETURN TO BOOKS FOR TEENS';
      }
    }

    this.state = {
      modalIsOpen: true,
      book: modalBook,
      transitionRoute,
      annualType,
      returnToText,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getMetaData = this.getMetaData.bind(this);
  }

  openModal() {
    utils.trackPicks('Modal', 'Open');

    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal() {
    utils.trackPicks('Modal', 'Closed');

    this.setState({
      modalIsOpen: false,
    });

    setTimeout(() => {
      let returnUrl = this.props.params.month;

      /* special cases for young adults and children */
      if (this.props.params.type &&
        (this.props.params.type === 'ya' || this.props.params.type === 'childrens')) {
        returnUrl = `${config.baseAnnualUrl}${this.props.params.type}`;
      } else {
        returnUrl = `${config.baseMonthUrl}${returnUrl}`;
      }

      return this.routeHandler(returnUrl);
    }, 200);
  }

  getMetaData(selection) {
    let type = 'staffpicks';

    if (selection && selection.length) {
      type = selection;
    }

    const heroData = {
      staffpicks: {
        type: 'staffpicks',
        title: 'RECOMMENDATIONS',
        description: 'Staff Picks',
        intro: 'True stories, tales of courage, historical romances, ' +
          'edge-of-your-seat thrillers... There is a huge world of books ' +
          'out there. Our expert staff members pick out their favorites ' +
          'to help you find your next one.',
        image: `${baseUrl}src/client/images/shelftalker.4.2.png`,
        url: `http://www.nypl.org${baseUrl}`,
      },
      childrens: {
        type: 'childrens',
        title: 'RECOMMENDATIONS',
        description: 'Children\'s Books',
        intro: 'Explore our annual selection of 100 notable titles for reading and sharing.',
        image: `${baseUrl}src/client/images/desktop.childrens100.FIN.png`,
        url: `http://www.nypl.org${baseUrl}annual/childrens`,
      },
      ya: {
        type: 'ya',
        title: 'RECOMMENDATIONS',
        description: 'Best Books for Teens',
        intro: 'Explore our annual selection of outstanding young adult titles.',
        image: `${baseUrl}src/client/images/desktop.banner.YA.FIN.png`,
        url: `http://www.nypl.org${baseUrl}annual/ya`,
      },
    };

    return heroData[type];
  }

  routeHandler(url) {
    this.context.router.push(url);
  }

  render() {
    const book = this.state.book;
    let title = 'Recommendations | The New York Public Library';
    let imageSrc = `${baseUrl}src/client/images/shelftalker.4.2.png`;
    let description = 'True stories, tales of courage, historical romances, ' +
        'edge-of-your-seat thrillers... There is a huge world of books ' +
        'out there. Our expert staff members pick out their favorites ' +
        'to help you find your next one.';
    let bookId;
    let metaType;
    let metaTagData;
    let imageLink;
    let modalTags;
    let tags;

    if (!this.state.annualType) {
      metaType = 'staffpicks';
    } else {
      metaType = this.state.annualType.type;
    }

    metaTagData = this.getMetaData(metaType);
    description = metaTagData.intro;

    if (book.item) {
      title = book.item.title;
      description = book.text;
      imageSrc = book.item.imageSlug;
      bookId = book.item.id;
    }

    imageLink = 'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?' +
      `&userID=NYPL49807&password=CC68707&Value=${imageSrc}&content=M&Return=1&Type=M`;

    modalTags = [
      { property: 'og:title', content: title },
      { property: 'og:image', content: imageLink },
      { property: 'og:description', content: description },
      { property: 'og:url', content: `${metaTagData.url}/${bookId}` },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageLink },
    ];
    tags = utils.metaTagUnion(modalTags);

    return (
      <div>
        <DocMeta tags={tags} />
        <Modal
          className={this.props.className}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="NYPL Staff Pick Selection"
        >
          <CloseButton
            className={`${this.props.className}__closeBtn`}
            onClick={this.closeModal}
            label={this.state.returnToText}
          />
          <BookTitle className={`${this.props.className}__BookTitle`} book={book} />
          <div className={`${this.props.className}__left-column`}>
            <div className={`${this.props.className}__left-column__image`}>
              <Book
                book={this.state.book}
                className={`${this.props.className}__left-column__image__cover`}
              />
            </div>
            <div className={`${this.props.className}__left-column__share`}>
              <BookShare
                shareType={this.state.annualType}
                className={`${this.props.className}__left-column__share-items`}
                book={this.state.book}
              />
            </div>
          </div>
          <BookIntro book={this.state.book} />
          <BookContent book={this.state.book} type={this.state.transitionRoute} />
        </Modal>
      </div>
    );
  }
}

BookModal.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object,
  data: PropTypes.array,
};

BookModal.defaultProps = {
  className: 'BookModal',
  id: 'BookModal',
};

BookModal.contextTypes = {
  router: PropTypes.object,
};

export default BookModal;
