import React from 'react';
import Router from 'react-router';
import Radium from 'radium';

import _ from 'underscore';

import Book from '../Book/Book.jsx';
import TimeSelector from '../TimeSelector/TimeSelector.jsx';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';
import staffPicksDate from '../../utils/DateService.js';

import utils from '../../utils/utils.js';

let Navigation = Router.Navigation,
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
  Books = React.createClass({
    getInitialState() {
      let clientParams = (this.props.params && this.props.params.type) ?
          this.props.params.type : '',
        transitionRoute = 'modal',
        route = this.props.route || clientParams,
        pickType = 'staffpicks';

      if ((route.indexOf('childrens') !== -1) || (route.indexOf('ya') !== -1)) {
        transitionRoute = 'annualModal';
        pickType = 'annual';
      }

      return _.extend({
        pickType: pickType,
        iso: null,
        book: {},
        books: [],
        modalIsOpen: false,
        noResults: false,
        transitionRoute
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
      }, 500);

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
        _this = this,
        params = this.props.params;

      // We don't need to filter based on age for c100 or ya100
      // and it needs to be removed from the Isotopes selector:
      if (params && params.type &&
        (params.type === 'childrens' || params.type === 'ya')) {
        selector = '';
      }

      if (filters.length) {
        selector += `.${filters.join('.')}`;
      }

      // The setTimeout is for switching between grid/list display.
      setTimeout(() => {
        _this.state.iso.arrange({
          filter: selector
        });
      }, 700);

      if (storeState._isotopesDidUpdate) {
        setTimeout(() => {
          this.state.iso.reloadItems();
        }, 500);
        setTimeout(() => {
          _this.state.iso.arrange({
            filter: selector
          });
        }, 1000);
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
      let params = this.props.params;

      utils._trackPicks('Book', book.item.title);

      this.transitionTo(this.state.transitionRoute, {
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
        picks = currentMonthPicks.picks ? currentMonthPicks.picks : [],
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
          <TimeSelector
            pickType={this.state.pickType}
            currentMonthPicks={currentMonthPicks}
            {...this.props} />

          <div id="masonryContainer" ref="masonryContainer" style={{opacity: '0'}}>
            <ul className='list-view'>
              <ReactCSSTransitionGroup transitionName='books' transitionAppear={true}>
                {books}
              </ReactCSSTransitionGroup>
            </ul>
          </div>
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
