// Library import
import React from 'react';
import PropTypes from 'prop-types';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const image = this.props.heroData.heroImageUrl;
    return (
      <div className="hero">
        <div className="hero-image">
          <img src={image} alt="" />
        </div>
        <div className="hero-container nypl-full-width-wrapper">
          <div className="nypl-row">
            <div className="hero-content nypl-column-three-quarters nypl-column-offset-one">
              <h1>{this.props.heroData.header}</h1>
              <p className="hero-content-description">
                {this.props.heroData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  currentPicks: PropTypes.object.isRequired,
  heroData: PropTypes.object.isRequired,
};

export default Hero;
