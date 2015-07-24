import React from 'react';
import Radium from 'radium';
// import MasonryMixin from 'react-masonry-mixin';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import API from '../../utils/ApiService.js';
import CloseButton from 'components/Books/CloseButton.jsx';

import Modal from 'react-modal';
import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

let bookContainer = document.getElementById('books'),
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  bookData = API.getBooks(),
  iso;

Modal.setAppElement(bookContainer);
Modal.injectCSS();

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
    let grid = document.getElementById('masonryContainer');
    iso = new Isotope(grid, {
      itemSelector: '.book-item',
      masonry: {
        columnWidth: 175,
        gutter: 23,
        isResizable: true,
        isFitWidth: false,
      }
    });
    iso.arrange({
      filter: '.Adult'
    });

    BookStore.addChangeListener(this.onChange);
  },

  componentDidUnmount: function () {
    BookStore.removeChangeListener(this.onChange);
  },

  onChange: function () {
    let age = '.' + BookStore.getAge(),
      filters = '',
      selector;

    if (BookStore.getFilters().length) {
      filters += '.' + BookStore.getFilters().join(', ' + age + '.');
    }
    
    selector = age + filters;

    setTimeout(function () {
      iso.arrange({
        filter: selector
      });
    }, 100);

    this.setState({
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge()
    });
  },

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
    const openModal = this.openModal,
      _this = this;

    let books, gridDisplay, listDisplay;

    books = this.state.books.map(function (element, i) {
      let tags = _.map(element['staff-pick-item']['staff-pick-tag'], function (tag) {
          return tag.id;
        }),
        tagClasses = tags.join(' '),
        listWidth = _this.state.typeDisplay === 'list';

      return (
        <li className={'book-item ' + element['staff-pick-age']['attributes']['age'] + ' ' + tagClasses}
          onClick={openModal.bind(_this, element)} key={element.id} 
          style={[
            listWidth ? styles.listWidth : styles.gridWidth
            ]}>
          {_this.state.typeDisplay === 'grid' ?
            <Book book={element} style={styles.bookItem} height={'270px'} width={'175px'} /> :
            <div>
              <h2 onClick={openModal.bind(_this, element)}>{element['staff-pick-item']['attributes']['title']}</h2>
              <p>By: {element['staff-pick-item']['attributes']['author']}</p>
            </div>
          }
        </li>
      );
    });

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

        <div id="masonryContainer" ref="masonryContainer">
          <ul className='list-view'>
            <ReactCSSTransitionGroup transitionName='books' transitionAppear={true}>
              {books}
            </ReactCSSTransitionGroup>
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
  listWidth: {
    width: '100%',
    marginBottom: '20px'
  },
  gridWidth: {},
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
