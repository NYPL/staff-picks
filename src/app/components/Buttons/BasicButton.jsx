// Import React library
import React from 'react';

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
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  lang: React.PropTypes.string,
  onClick: React.PropTypes.function,
  onMouseLeave: React.PropTypes.function,
  onMouseEnter: React.PropTypes.function,
  style: React.PropTypes.object,
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
