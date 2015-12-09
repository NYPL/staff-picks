// Library import
import React from 'react';
import Radium from 'radium';

// Component import
import HeroTitle from './HeroTitle/HeroTitle.jsx';
import HeroImage from './HeroImage/HeroImage.jsx';

import cx from 'classnames';

// import appConfig from '../../../../appConfig.js';

class Hero extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {};
  }

  _getHeroData(selection) {
    let type = 'staffpicks';

    if (selection && selection.length) {
      type = selection;
    }

    let heroData = {
        staffpicks: {
          type: 'staffpicks',
          title: 'RECOMMENDATIONS',
          description: 'Staff Picks',
          intro: 'True stories, tales of courage, historical romances, ' +
            'edge-of-your-seat thrillers... There is a huge world of books ' +
            'out there. Our expert staff members pick out their favorites ' +
            'to help you find your next one.'
        },
        childrens: {
          type: 'childrens',
          title: 'STAFF PICKS',
          description: 'Children\'s Books',
          intro: 'Explore our annual selections for reading and sharing.'
        },
        ya: {
          type: 'ya',
          title: 'STAFF PICKS',
          description: 'Young Adult Books',
          intro: 'Explore our annual selections of the best books for teens.',
        }
      };

    return heroData[type];
  }

  render() {
    let heroData = this._getHeroData(this.props.staffPicksType),
      image = heroData.type === 'staffpicks' ?
        <div key='HeroImageContainer' className={`${this.props.className}__image`}></div>
        : null,
      bannerStyle = styles[heroData.type];
console.log(heroData);
    return (
      <div key='Hero' className={this.props.className} style={bannerStyle}>
        <div key='HeroContainer' className={`${this.props.className}__container`}>
          <div key='TextContainer' className={`${this.props.className}__text`}>
            <HeroTitle
              className={`${this.props.className}__text__HeroTitle`}
              title={heroData.title}
              des={heroData.description}
              intro={heroData.intro} />
          </div>
          {image}
        </div>
      </div>
    );
  }
};

Hero.defaultProps = {
  className: 'Hero',
};

const styles= {
  childrens: {
    backgroundImage: 'url("/browse/recommendations/staff-picks/src/client/images/desktop.landing.banner.c100.png")',
    backgroundSize: '100%'
  },
  ya: {
    backgroundImage: 'url("/browse/recommendations/staff-picks/src/client/images/desktop.YA100.png")',
    backgroundSize: '100%'
  },
  staffpicks: {}
};

export default Radium(Hero);
