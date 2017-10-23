// Library import
import React from 'react';
import PropTypes from 'prop-types';

import config from '../../../../appConfig.js';

const { baseUrl } = config;
const styles = {
  childrens: {
    backgroundImage: `url("${baseUrl}src/client/images/desktop.childrens100.FIN.png")`,
  },
  ya: {
    backgroundImage: `url("${baseUrl}src/client/images/desktop.banner.YA.FIN.png")`,
  },
};

class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.getHeroData = this.getHeroData.bind(this);
    this.getType = this.getType.bind(this);
  }
  getHeroData(selection) {
    let type = '';

    if (selection) {
      type = selection;
    }

    const heroData = {
      childrens: {
        type: 'childrens',
        title: 'RECOMMENDATIONS',
        description: 'Children\'s Books',
        intro: 'Explore our annual selection of 100 notable titles for reading and sharing.',
        image: `${baseUrl}src/client/images/c100.OG.png`,
        url: `http://www.nypl.org${baseUrl}annual/childrens`,
      },
      ya: {
        type: 'ya',
        title: 'RECOMMENDATIONS',
        description: 'Best Books for Teens',
        intro: 'Explore our annual selection of outstanding young adult titles.',
        image: `${baseUrl}src/client/images/YA.OG.png`,
        url: `http://www.nypl.org${baseUrl}annual/ya`,
      },
    };

    return heroData[type];
  }

  getType() {
    const clientParam = (this.props.annualList && this.props.params) ? this.props.params.type : '';
    const route = this.props.location.pathname || clientParam;

    if (route.indexOf('childrens') !== -1) {
      return 'childrens';
    }

    if (route.indexOf('ya') !== -1) {
      return 'ya';
    }

    // Temporary default:
    return 'childrens';
  }

  render() {
    const heroData = this.getHeroData(this.getType());
    const bannerStyle = styles[heroData.type];

    return (
      <div className="Hero" style={bannerStyle}>
        <div className="Hero__container nypl-full-width-wrapper">
          <div className="Hero__text">
            <div className="Hero__text__HeroTitle">
              <h3>{heroData.title}</h3>
              <p className="Hero__text__HeroTitle__des">
                {heroData.description}
              </p>
              <p className="Hero__text__HeroTitle__intro">
                {heroData.intro}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
  annualList: PropTypes.bool,
};

export default Hero;
