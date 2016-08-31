import React from 'react';

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
  tags: React.PropTypes.array,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default TagList;
