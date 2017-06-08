import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <a
      id="close-button"
      href="#"
      className={props.className}
      onClick={handleClick.bind(this)}
    >
      {props.label}
    </a>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
};

CloseButton.defaultProps = {
  className: 'CloseButton',
  label: '',
};

export default CloseButton;
