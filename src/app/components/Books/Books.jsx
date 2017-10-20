/* global $, Isotope */

import React from 'react';
import PropTypes from 'prop-types';
import { map as _map } from 'underscore';

import Book from '../Book/Book.jsx';

const styles = {
  base: {},
  gridWidth: {
    width: '250px',
  },
};

const Books = (props) => {
  const currentMonthPicks = props.currentMonthPicks;
  const picks = currentMonthPicks.picks ? currentMonthPicks.picks : [];
  const books = picks.length ? picks.map(element => {
    const tagList = element.tags || [];
    const tagIDs = _map(tagList, tag => tag.id);
    const tagClasses = tagIDs.join(' ');

    return (
      <li
        className={`book-item ${tagClasses}`}
        key={element.title.trim()}
        style={styles.gridWidth}
      >
        <Book
          book={element}
          className="book"
        />
      </li>
    );
  })
  : null;

  return (
    <ul className="list-view">
      {books}
    </ul>
  );
};

Books.propTypes = {
  currentMonthPicks: PropTypes.object,
};

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
};

export default Books;
