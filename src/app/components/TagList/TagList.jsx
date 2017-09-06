import React from 'react';
import PropTypes from 'prop-types';

const TagList = (props) => {
  const tags = props.tags.map((tag, i) => (<li key={i}>{tag}</li>));

  return (
    <div className={props.className} style={props.style}>
      <p>Filed under:</p>
      <ul>
        {tags}
      </ul>
    </div>
  );
};

TagList.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default TagList;
