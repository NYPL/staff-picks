import React from 'react';
import Radium from 'radium';
import Book from '../Book/Book.jsx';
import BookContent from '../BookContent/BookContent.jsx';
import API from '../../utils/ApiService.js';
import CloseButton from './CloseButton.jsx';

import _ from 'underscore';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import Router from 'react-router';

let Navigation = Router.Navigation;

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  bookData = API.getBooks();

// class Books extends React.Component {
var Books = React.createClass({
  getInitialState() {
    return {
      iso: null,
      book: {},
      books: this.props.books['staff-picks'] || bookData,
      modalIsOpen: false,
      typeDisplay: BookStore.getBookDisplay(),
      age: BookStore.getAge(),
      noResults: false
    };
  },

  mixins: [Navigation],

  componentDidMount () {
    // This needs to be set done once the component is available
    let grid = document.getElementById('masonryContainer'),
      _this = this;

    // this.setState does not work in this case because
    // iso.arrange also needs to be called.
    this.state.iso = new Isotope(grid, {
      itemSelector: '.book-item',
      masonry: {
        columnWidth: 250,
        isResizable: true,
        isFitWidth: true,
        gutter: 10
      }
    });

    $('#masonryContainer').css('opacity', '1');

    setTimeout(function () {
      _this.state.iso.arrange({
        filter: '.Adult'
      });
    }, 1200);

    BookStore.addChangeListener(this._onChange);
    BookActions.updateNewFilters(this.state.iso.getItemElements());
  },

  componentDidUnmount () {
    BookStore.removeChangeListener(this._onChange);
  },

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
  },

  _openModal (book) {
    this.transitionTo('modal', {id: book['staff-pick-item']['id']});
  },

  _getTags (elem) {
    return elem['staff-pick-item']['staff-pick-tag'] || [];
  },

  _getAge (elem) {
    if (!elem['staff-pick-age']) {
      return;
    }
    return elem['staff-pick-age']['attributes']['age'];
  },

  render () {
    const openModal = this._openModal,
      _this = this;

    let books;

    books = this.state.books.map(function (element, i) {
      let tagList = _this._getTags(element),
        age = _this._getAge(element),
        tagIDs = _.map(tagList, function (tag) {
          return tag.id;
        }),
        tagClasses = tagIDs.join(' '),
        listDisplay = _this.state.typeDisplay === 'list';

      return (
        <li className={'book-item ' + age + ' ' + tagClasses}
          key={element.id} onClick={openModal.bind(_this, element)}
          style={[listDisplay ? styles.listWidth : styles.gridWidth]}>
          {_this.state.typeDisplay === 'grid' ?
            <Book book={element} style={styles.bookItem} width={'100%'} /> :
            <div>
                <h2>{element['staff-pick-item']['attributes']['title']}</h2>
              <p>By: {element['staff-pick-item']['attributes']['author']}</p>
            </div>
          }
        </li>
      );
    });

    return (
      <div>
        <div className='month-picker' style={styles.monthPicker}>
          <a style={styles.previousMonth} onClick={this._handleClick}>
            Picks for June
            <span className='left-icon'></span>
          </a>

          <p style={styles.month}>July 2015</p>

          <a style={styles.nextMonth} onClick={this._handleClick}>
            Picks for August
            <span className='right-icon'></span>
          </a>
        </div>

        <div id="masonryContainer" ref="masonryContainer" style={{opacity: '0'}}>
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
      </div>
    );
  },

  _handleClick (e) {
    e.preventDefault();
  }
});

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
  gridWidth: {
    width: '250px'
  },
  showNoResults: {
    display: 'inline-block',
    fontSize: '14px'
  },
  hideNoResults: {
    display: 'none'
  },
  bookItem: {
    marginBottom: '20px'
  },
  monthPicker: {
    height: '35px',
    marginLeft: '-23px',
    paddingTop: '7px',
    textAlign: 'center'
  },
  month: {
    display: 'inline-block',
    color: '#333333',
    marginLeft: '25px',
    '@media (min-width: 600px)': { marginLeft: '0' }
  },
  nextMonth: {
    float: 'right'
  },
  previousMonth: {
    float: 'left',
    width: '100px'
  }
};

export default Radium(Books);
