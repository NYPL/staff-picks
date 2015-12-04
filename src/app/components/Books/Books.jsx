import React from 'react';
import Router from 'react-router';
import Radium from 'radium';

import _ from 'underscore';

import Book from '../Book/Book.jsx';
import MonthPicker from '../MonthPicker/MonthPicker.jsx';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';
import staffPicksDate from '../../utils/DateService.js';

import utils from '../../utils/utils.js';

let Navigation = Router.Navigation,
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  Books = React.createClass({
    getInitialState() {
      return _.extend({
        iso: null,
        book: {},
        books: [],
        modalIsOpen: false,
        noResults: false
      }, BookStore.getState());
    },

    mixins: [Navigation],

    componentDidMount() {
      // This needs to be set done once the component is available
      let grid = document.getElementById('masonryContainer');

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
      this.state.iso.arrange({
        filter: '.Adult'
      });
      setTimeout(() => {
        BookActions.updateNewFilters(this.state.iso.getItemElements());
        BookActions.updateFilterAge('Adult');
      }, 150);

      BookStore.listen(this._onChange);
    },

    componentDidUnmount() {
      BookStore.unlisten(this._onChange);
    },

    _onChange() {
      let storeState = BookStore.getState(),
        age = `.${storeState._age}`,
        filters = storeState._filters,
        selector = age,
        _this = this;

      if (filters.length) {
        selector += `.${filters.join('.')}`;
      }

      // The setTimeout is for switching between grid/list display.
      setTimeout(() => {
        _this.state.iso.arrange({
          filter: selector
        });
      }, 300);

      if (storeState._isotopesDidUpdate) {
        setTimeout(() => {
          this.state.iso.reloadItems();
        }, 300);
        setTimeout(() => {
          _this.state.iso.arrange({
            filter: selector
          });
        }, 900);
      }

      this.state.iso.on('arrangeComplete', filteredItems => {
        if (!filteredItems.length) {
          _this.setState({
            noResults: true
          });
        }
      });

      this.setState(_.extend({
        noResults: false,
      }, BookStore.getState()));
    },

    _openModal(book) {
      let transitionRoute;
      let params = this.props.params;

      utils._trackPicks('Book', book.item.title);

      // console.log(params);

      if (!params.type && (params.month === undefined || params.month.length)) {
        // console.log('month params!')
        transitionRoute = 'modal';
      }

      if (params.type && (params.type === 'childrens' || params.type === 'ya')) {
        // console.log('annual');
        transitionRoute = 'annualModal';
      }

      this.transitionTo(transitionRoute, {
        month: this.state._currentMonthPicks.date,
        year: this.state._currentMonthPicks.date,
        id: book.item.id,
        type: params.type || ''
      });
    },

    _getTags(elem) {
      return elem.item.tags || [];
    },

    _getAge(elem) {
      if (!elem.age) {
        return;
      }
      return elem.age.age;
    },

    // Maybe this can be a small component in itself?
    _getBookListItem(elem) {
      return (
        <div>
          <h2>{elem.item.title}</h2>
          <p>By: {elem.item.author}</p>
        </div>
      );
    },

    render() {
      const openModal = this._openModal;

      let currentMonthPicks = this.state._currentMonthPicks,
        picks = currentMonthPicks.picks,
        gridDisplay = this.state._bookDisplay === 'grid',
        books = picks.map((element, i) => {
          let tagList = this._getTags(element),
            age = this._getAge(element),
            tagIDs = _.map(tagList, tag => {
              return tag.id;
            }),
            tagClasses = tagIDs.join(' '),
            listDisplay = gridDisplay ? styles.gridWidth : styles.listWidth,
            listItem = gridDisplay ? <Book book={element} className='book' />
              : this._getBookListItem(element);

          return (
            <li className={'book-item ' + age + ' ' + tagClasses}
              key={element.id} onClick={openModal.bind(this, element)}
              style={listDisplay}>
              {listItem}
            </li>
          );
        });

      return (
        <div>
          <MonthPicker currentMonthPicks={currentMonthPicks} />

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
  }
};

export default Radium(Books);
