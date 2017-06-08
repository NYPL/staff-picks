// Import React library
import React from 'react';
import PropTypes from 'prop-types';

const BasicButton = (props) => (
  <button
    ref="BasicButton"
    id={props.id}
    className={props.className}
    name={props.name}
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    style={props.style}
  >
    {props.label}
  </button>
);

BasicButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  lang: PropTypes.string,
  onClick: PropTypes.function,
  onMouseLeave: PropTypes.function,
  onMouseEnter: PropTypes.function,
  style: PropTypes.object,
};

BasicButton.defaultProps = {
  id: 'BasicButton',
  className: 'BasicButton',
  name: 'BasicButton',
  label: 'Basic Button',
  lang: 'en',
  onClick() {},
};

// Export the component
export default BasicButton;
