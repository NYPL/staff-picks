import React from 'react';
import PropTypes from 'prop-types';
import ImageComponent from '../../ImageComponent/ImageComponent.jsx';

const HeroImage = (props) => (
  <ImageComponent id={props.id} className={props.className} />
);

HeroImage.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default HeroImage;
