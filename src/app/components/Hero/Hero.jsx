// Library import
import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ heroData }) => {
  const image = heroData.heroImageUrl;

  return (
    <div className="hero">
      <div className="hero-image">
        <img src={image} alt="" />
      </div>
      <div className="hero-container">
        <div className="nypl-full-width-wrapper">
          <div className="hero-content nypl-column-three-quarters nypl-column-offset-one">
            <h1>{heroData.header}</h1>
            <p className="hero-content-description">
              {heroData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  heroData: PropTypes.object.isRequired,
};

export default Hero;
