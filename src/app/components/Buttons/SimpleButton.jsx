import React from 'react';

import { gaUtils } from 'dgx-react-ga';

const SimpleButton = (props) => {
  const onClick = () => {
    gaUtils.trackGeneralEvent(props.gaCategory, props.gaAction, props.gaLabel);
    props.onClick();
  };

  return (
    <a
      id={props.id}
      className={props.className}
      href={props.target}
      onClick={() => onClick()}
      style={props.style}
    >
      {props.label}
    </a>
  );
};

SimpleButton.propTypes = {
  gaCategory: React.PropTypes.string,
  gaAction: React.PropTypes.string,
  gaLabel: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  target: React.PropTypes.string,
  style: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

SimpleButton.defaultProps = {
  id: 'SimpleButton',
  className: 'SimpleButton',
  label: 'Button',
  lang: 'en',
  target: '#',
};

export default SimpleButton;
