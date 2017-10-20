import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <button
      id="close-button"
      className={props.className}
      onClick={handleClick}
    >
      {props.label}
    </button>
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
