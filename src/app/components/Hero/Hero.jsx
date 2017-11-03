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
        className="hero"
        style={{ backgroundImage: `url("${this.props.heroData.heroImageUrl}")` }}
      >
        <div className="hero_container nypl-full-width-wrapper">
          <div className="hero_text nypl-column-three-quarters nypl-column-offset-one">
            <div className="hero_text_heroTitle">
              {this.props.heroData.category ? <p>{this.props.heroData.category}</p> : ''}
              <h1 className="hero_text_heroTitle_des">
                {this.props.heroData.header}
              </h1>
              <p className="hero_text_heroTitle_intro">
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
