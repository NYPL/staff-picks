import React from 'react';

import ImageComponent from '../../ImageComponent/ImageComponent.jsx';

const HeroImage = (props) => (
  <ImageComponent id={props.id} className={props.className} />
);

HeroImage.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default HeroImage;
