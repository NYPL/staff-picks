// Library import
import React from 'react';
import PropTypes from 'prop-types';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="Hero"
        style={{ backgroundImage: `url("${this.props.currentPicks.heroImageUrl}")` }}
      >
        <div className="Hero__container nypl-full-width-wrapper">
          <div className="Hero__text nypl-column-three-quarters nypl-column-offset-one">
            <div className="Hero__text__HeroTitle">
              <h3>{this.props.heroData.category}</h3>
              <p className="Hero__text__HeroTitle__des">
                {this.props.heroData.header}
              </p>
              <p className="Hero__text__HeroTitle__intro">
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
