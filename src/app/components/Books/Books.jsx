import React from 'react';
import radium from 'radium';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  extend as _extend,
  map as _map,
} from 'underscore';

import Book from '../Book/Book.jsx';
import TimeSelector from '../TimeSelector/TimeSelector.jsx';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import utils from '../../utils/utils.js';

const styles = {
  base: {},
  listWidth: {
    width: '100%',
    marginBottom: '20px',
  },
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

    const clientParams = (this.props.params && this.props.params.type) ?
      this.props.params.type : '';
    const route = this.props.location.pathname || clientParams;
    let transitionRoute = 'modal';
    let pickType = 'staffpicks';

    if ((route.indexOf('childrens') !== -1) || (route.indexOf('ya') !== -1)) {
      transitionRoute = 'annualModal';
      pickType = 'annual';
    }

    this.state = _extend({
      iso: null,
      book: {},
      books: [],
      modalIsOpen: false,
      noResults: false,
      transitionRoute,
      pickType,
    }, BookStore.getState());

    this.onChange = this.onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getAge = this.getAge.bind(this);
    this.getBookListItem = this.getBookListItem.bind(this);
  }

  componentDidMount() {
    // This needs to be set done once the component is available
    const grid = document.getElementById('masonryContainer');

    // this.setState does not work in this case because
    // iso.arrange also needs to be called.
    this.state.iso = new Isotope(grid, {
      itemSelector: '.book-item',
      masonry: {
        columnWidth: 250,
        isResizable: true,
        isFitWidth: true,
        gutter: 10,
      },
    });

    $('#masonryContainer').css('opacity', '1');
    this.state.iso.arrange({
      filter: '.Adult',
    });
    setTimeout(() => {
      BookActions.updateNewFilters(this.state.iso.getItemElements());
      BookActions.updateFilterAge('Adult');
    }, 500);

    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    const storeState = BookStore.getState();
    const age = `.${storeState._age}`;
    const filters = storeState._filters;
    const params = this.props.params;
    let selector = age;

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
      this.state.iso.arrange({
        filter: selector,
      });
    }, 600);

    if (storeState._isotopesDidUpdate) {
      setTimeout(() => {
        this.state.iso.reloadItems();
      }, 400);
    }

    this.state.iso.on('arrangeComplete', filteredItems => {
      if (!filteredItems.length) {
        this.setState({
          noResults: true,
        });
      }
    });

    this.setState(_extend({
      noResults: false,
    }, BookStore.getState()));
  }

  getTags(elem) {
    return elem.item.tags || [];
  }

  getAge(elem) {
    if (!elem.age) {
      return;
    }
    return elem.age.age;
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

  openModal(book, date) {
    const params = this.props.params;
    let baseUrl = '/browse/recommendations/staff-picks/';

    utils._trackPicks('Book', book.item.title);

    /* special cases for young adults and children */
    if (params.type && (params.type === 'ya' || params.type === 'childrens')) {
      baseUrl += `annual/${this.props.params.type}/`;
    }

    this.routeHandler(`${baseUrl}${date}/${book.item.id}`, params.type);
  }

  routeHandler(url) {
    this.context.router.push(url);
  }

  render() {
    const openModal = this.openModal;
    const gridDisplay = this.state._bookDisplay === 'grid';
    const currentMonthPicks = this.state._currentMonthPicks;
    const picks = currentMonthPicks.picks ? currentMonthPicks.picks : [];
    const books = picks.map(element => {
      const tagList = this.getTags(element);
      const age = this.getAge(element);
      const tagIDs = _map(tagList, tag => tag.id);
      const tagClasses = tagIDs.join(' ');
      const listDisplay = gridDisplay ? styles.gridWidth : styles.listWidth;
      const listItem = gridDisplay ? <Book book={element} className="book" />
          : this.getBookListItem(element);

      return (
        <li
          className={`book-item ${age} ${tagClasses}`}
          key={element.id}
          onClick={() => openModal(element, currentMonthPicks.date)}
          style={listDisplay}
        >
          {listItem}
        </li>
      );
    });

    return (
      <div>
        <TimeSelector
          pickType={this.state.pickType}
          currentMonthPicks={currentMonthPicks}
          {...this.props}
        />

        <div id="masonryContainer" ref="masonryContainer">
          <ul className="list-view">
            <ReactCSSTransitionGroup
              transitionName="books"
              transitionAppear={true}
              transitionEnterTimeout={500}
              transitionAppearTimeout={500}
              transitionLeaveTimeout={500}
            >
              {books}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </div>
    );
  }
}

Books.propTypes = {
  location: React.PropTypes.object,
  params: React.PropTypes.object,
};

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
};

Books.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default radium(Books);
