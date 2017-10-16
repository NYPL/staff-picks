// Library import
import React from 'react';
import PropTypes from 'prop-types';

import DocMeta from 'react-doc-meta';
import utils from '../../utils/utils';

const styles = {
  childrens: {
    backgroundImage: 'url("/books-music-dvds/recommendations/staff-picks/src/client/im' +
      'ages/desktop.childrens100.FIN.png")',
  },
  ya: {
    backgroundImage: 'url("/books-music-dvds/recommendations/staff-picks/src/client/im' +
      'ages/desktop.banner.YA.FIN.png")',
  },
};

class Hero extends React.Component {
  getHeroData(selection) {
    let type = 'staffpicks';

    if (selection && selection.length) {
      type = selection;
    }

    const heroData = {
      staffpicks: {
        type: 'staffpicks',
        title: 'RECOMMENDATIONS',
        description: 'Staff Picks',
        intro: 'True stories, tales of courage, historical romances, ' +
            'edge-of-your-seat thrillers... There is a huge world of books ' +
            'out there. Our expert staff members pick out their favorites ' +
            'to help you find your next one.',
        image: '/books-music-dvds/recommendations/staff-picks/src/client/images/' +
          'shelftalker.4.2.png',
        url: 'http://www.nypl.org/books-music-dvds/recommendations/staff-picks/',
      },
      childrens: {
        type: 'childrens',
        title: 'RECOMMENDATIONS',
        description: 'Children\'s Books',
        intro: 'Explore our annual selection of 100 notable titles for reading and sharing.',
        image: '/books-music-dvds/recommendations/staff-picks/src/client/images/c100.OG.png',
        url: 'http://www.nypl.org/books-music-dvds/recommendations/staff-picks/annual/childrens',
      },
      ya: {
        type: 'ya',
        title: 'RECOMMENDATIONS',
        description: 'Best Books for Teens',
        intro: 'Explore our annual selection of outstanding young adult titles.',
        image: '/books-music-dvds/recommendations/staff-picks/src/client/images/YA.OG.png',
        url: 'http://www.nypl.org/books-music-dvds/recommendations/staff-picks/annual/ya',
      },
    };

    return heroData[type];
  }

  getType() {
    const clientParam = (this.props.params && this.props.params.type) ?
        this.props.params.type : '';
    const route = this.props.location.pathname || clientParam;

    if (route.indexOf('childrens') !== -1) {
      return 'childrens';
    }

    if (route.indexOf('ya') !== -1) {
      return 'ya';
    }

    return 'staffpicks';
  }

  render() {
    const heroData = this.getHeroData(this.getType());
    const image = heroData.type === 'staffpicks' ?
      <div key="HeroImageContainer" className={`${this.props.className}__image`}></div>
      : null;
    const bannerStyle = styles[heroData.type];
    const homepageTags = [
      { property: 'og:title', content: 'Recommendations | The New York Public Library' },
      { property: 'og:image', content: heroData.image },
      { property: 'og:description', content: `${heroData.description} | ${heroData.intro}` },
      { property: 'og:url', content: heroData.url },
      { name: 'twitter:title', content: 'Recommendations | The New York Public Library' },
      { name: 'twitter:description', content: `${heroData.description} | ${heroData.intro}` },
      { name: 'twitter:image', content: heroData.image },
    ];
    const tags = utils.metaTagUnion(homepageTags);

    return (
      <div key="Hero" className={this.props.className} style={bannerStyle}>
        <DocMeta tags={tags} />
        <div key="HeroContainer" className={`${this.props.className}__container`}>
          <div key="TextContainer" className={`${this.props.className}__text`}>
            <div className={`${this.props.className}__text__HeroTitle`}>
              <h3>{heroData.title}</h3>
              <p className={`${this.props.className}__text__HeroTitle__des`}>
                {heroData.description}
              </p>
              <p className={`${this.props.className}__text__HeroTitle__intro`}>
                {heroData.intro}
              </p>
            </div>
          </div>
          {image}
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
  className: PropTypes.string,
};

Hero.defaultProps = {
  className: 'Hero',
};

export default Hero;
