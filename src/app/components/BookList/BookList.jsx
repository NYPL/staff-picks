import React from 'react';
import PropTypes from 'prop-types';

import Book from '../Book/Book.jsx';
import utils from '../../utils/utils';

const Books = (props) => {
  const currentMonthPicks = props.currentMonthPicks;
  const picks = currentMonthPicks.picks ? currentMonthPicks.picks : [];
  const filteredBooks = props.selectedFilters.length ?
    picks.filter(book => {
      const tagArray = utils.getPickTags(book);
      const inSelectedFilter = utils.getSelectedTags(tagArray, props.selectedFilters);

      if (inSelectedFilter.length && (inSelectedFilter.length === props.selectedFilters.length)) {
        return book;
      }

      return undefined;
    })
    : picks;

  const books = picks.length ? filteredBooks.map((book, i) => <Book key={i} book={book} />) : null;

  return (
    <div className="booklist nypl-column-three-quarters">
      <h2>2017 Picks</h2>

      <ul className="nypl-row">
        {books}
      </ul>
    </div>
  );
};

Books.propTypes = {
  currentMonthPicks: PropTypes.object,
  selectedFilters: PropTypes.array,
};

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
};

export default Books;
