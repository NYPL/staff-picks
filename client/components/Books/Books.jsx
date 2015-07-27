import React from 'react';
import Radium from 'radium';
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
  bookData = API.getBooks();

Modal.setAppElement(bookContainer);
Modal.injectCSS();

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iso: null,
      book: {},
      books: bookData,
      modalIsOpen: false,
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge(),
      noResults: false
    };

    this._onChange = this._onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount () {
    // This needs to be set done once the component is available
    let grid = document.getElementById('masonryContainer');
    // this.setState does not work in this case because
    // iso.arrange also needs to be called.
    this.state.iso = new Isotope(grid, {
      itemSelector: '.book-item',
      masonry: {
        columnWidth: 175,
        gutter: 23,
        isResizable: true,
        isFitWidth: false,
      }
    });
    this.state.iso.arrange({
      filter: '.Adult'
    });

    BookStore.addChangeListener(this._onChange);
    BookActions.updateNewFilters(this.state.iso.getItemElements());
  }

  componentDidUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    let age = '.' + BookStore.getAge(),
      selector = age,
      _this = this;

    if (BookStore.getFilters().length) {
      selector += '.' + BookStore.getFilters().join('.');
    }

    setTimeout(function () {
      _this.state.iso.arrange({
        filter: selector
      });
    }, 100);

    this.state.iso.on('arrangeComplete', function (filteredItems) {
      if (!filteredItems.length) {
        _this.setState({
          noResults: true
        });
      }
    });

    this.setState({
      noResults: false,
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge()
    });
  }

  openModal (book) {
    this.setState({
      book: book,
      modalIsOpen: true
    });
  }

  closeModal () {
    this.setState({
      book: {},
      modalIsOpen: false
    });
  }

  render () {
    const openModal = this.openModal,
      _this = this;

    let books;

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

    return (
      <div>
        <div className='month-picker' style={styles.monthPicker}>
          <a href='#' style={styles.previousMonth} onClick={this._handleClick}>
            Picks for June
            <span className='left-icon'></span>
          </a>

          <p style={styles.month}>July 2015</p>

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
        <p style={[
          this.state.noResults ? styles.showNoResults : styles.hideNoResults
          ]}>
          No results are available for this age category.
        </p>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <CloseButton onClick={this.closeModal} />
          <div style={{'width':'30%', 'display':'inline-block'}}>
            <Book book={this.state.book}  />
          </div>
          <BookContent book={this.state.book} />
        </Modal>
      </div>
    );
  }

  _handleClick (e) {
    e.preventDefault();
  }
}

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {},
  listWidth: {
    width: '100%',
    marginBottom: '20px'
  },
  gridWidth: {},
  showNoResults: {
    display: 'inline-block',
    fontSize: '14px'
  },
  hideNoResults: {
    display: 'none'
  },
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
