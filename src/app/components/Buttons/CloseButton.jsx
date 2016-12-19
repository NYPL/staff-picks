import React from 'react';

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
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  label: React.PropTypes.string,
};

CloseButton.defaultProps = {
  className: 'CloseButton',
  label: '',
};

export default CloseButton;
