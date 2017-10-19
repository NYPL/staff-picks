/* global $, Isotope */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import {
  extend as _extend,
  map as _map,
} from 'underscore';

import Book from '../Book/Book.jsx';
import TimeSelector from '../TimeSelector/TimeSelector.jsx';

import BookStore from '../../stores/BookStore.js';

import utils from '../../utils/utils.js';
import appConfig from '../../../../appConfig.js';

const styles = {
  base: {},
  gridWidth: {
    width: '250px',
  },
  showNoResults: {
    display: 'inline-block',
    fontSize: '14px',
  },
  hideNoResults: {
    display: 'none',
  },
};

class Books extends React.Component {
  constructor(props) {
    super(props);

    const clientParams = (this.props.annualList) ? this.props.params.type : '';
    let transitionRoute = 'modal';

    if ((clientParams === 'childrens') || (clientParams === 'ya')) {
      transitionRoute = 'annualModal';
    }

    this.state = _extend({
      book: {},
      books: [],
      noResults: false,
      transitionRoute,
    }, BookStore.getState());

    this.onChange = this.onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getBookListItem = this.getBookListItem.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(_extend({
      noResults: false,
    }, BookStore.getState()));
  }

  getTags(elem) {
    return elem.item.tags || [];
  }

  // Maybe this can be a small component in itself?
  getBookListItem(elem) {
    return (
      <div>
        <h2>{elem.item.title}</h2>
        <p>By: {elem.item.author}</p>
      </div>
    );
  }

  openModal(e, book, date) {
    e.preventDefault();
    const params = this.props.params;
    let baseUrl = '';

    utils.trackPicks('Book', book.item.title);

    /* special cases for young adults and children */
    if (this.props.annualList) {
      baseUrl += `${appConfig.baseAnnualUrl}${params.type}/`;
    } else {
      baseUrl += `${appConfig.baseMonthUrl}`;
    }

    this.routeHandler(`${baseUrl}${date}/${book.item.id}`, params.type);
  }

  routeHandler(url) {
    this.context.router.push(url);
  }

  render() {
    const openModal = this.openModal;
    const currentMonthPicks = this.state.currentMonthPicks;
    const picks = currentMonthPicks.picks ? currentMonthPicks.picks : [];
    const books = picks.map(element => {
      const tagList = this.getTags(element);
      const tagIDs = _map(tagList, tag => tag.id);
      const tagClasses = tagIDs.join(' ');

      return (
        <li
          className={`book-item ${tagClasses}`}
          key={element.id}
          style={styles.gridWidth}
        >
          <Book
            book={element}
            className="book"
            onClick={(e) => openModal(e, element, currentMonthPicks.date)}
          />
        </li>
      );
    });

    return (
      <div>
        <TimeSelector
          currentMonthPicks={currentMonthPicks}
          annualList={this.props.annualList}
          params={this.props.params}
        />

        <div id="masonryContainer" ref="masonryContainer">
          <ul className="list-view">
            <CSSTransitionGroup
              transitionName="books"
              transitionAppear
              transitionEnterTimeout={500}
              transitionAppearTimeout={500}
              transitionLeaveTimeout={500}
            >
              {books}
            </CSSTransitionGroup>
          </ul>
        </div>
      </div>
    );
  }
}

Books.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  annualList: PropTypes.bool,
};

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
};

Books.contextTypes = {
  router: PropTypes.object,
};

export default Books;
