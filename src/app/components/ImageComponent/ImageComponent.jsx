import React from 'react';
import PropTypes from 'prop-types';

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
  id: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string,
};

ImageComponent.defaultProps = {
  className: 'BasicImageComponent',
  alt: '',
};

export default ImageComponent;
