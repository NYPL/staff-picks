import React from 'react';
import PropTypes from 'prop-types';

import TagList from '../TagList/TagList.jsx';

import {
  pluck as _pluck,
  flatten as _flatten,
} from 'underscore';

const BookIntro = (props) => {
  const getTags = (tags) => _flatten(_pluck(tags, 'tag'));

  const book = props.book;
  const tags = getTags(book.item.tags);
  const author = book.item.author;

  return (
    <div className={`${props.className}`}>
      <p className={`${props.className}__author`}>By {author}</p>
      <TagList className={`${props.className}__tags`} tags={tags} />
    </div>
  );
};

BookIntro.propTypes = {
  book: PropTypes.object,
  className: PropTypes.string,
};

BookIntro.defaultProps = {
  className: 'BookIntro',
};

export default BookIntro;
