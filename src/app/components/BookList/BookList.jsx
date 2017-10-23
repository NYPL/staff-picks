import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book.jsx';

const Books = (props) => {
  const currentMonthPicks = props.currentMonthPicks;
  const picks = currentMonthPicks.picks ? currentMonthPicks.picks : [];
  const books = picks.length ? picks.map((book, i) => <Book key={i} book={book} />) : null;

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
};

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
};

export default Books;
