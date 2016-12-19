import React from 'react';

const ImageComponent = (props) => (
  <img
    id={props.id}
    className={props.className}
    alt={props.alt}
    style={props.style}
    src={props.src}
  />
);

ImageComponent.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  alt: React.PropTypes.string,
  style: React.PropTypes.object,
  src: React.PropTypes.string,
};

ImageComponent.defaultProps = {
  className: 'BasicImageComponent',
  alt: '',
};

export default ImageComponent;
