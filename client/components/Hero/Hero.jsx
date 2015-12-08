// Library import
import React from 'react';
import Radium from 'radium';

// Component import
import HeroTitle from './HeroTitle/HeroTitle.jsx';
import HeroImage from './HeroImage/HeroImage.jsx';

class Hero extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {    
    return (
      <div key='Hero' className='hero'>
        <div key='HeroContainer' className='hero__container'>
          <div key='TextContainer' className='hero__container__text-container'>
            <HeroTitle
              className='hero__container__text-container__title'
              title='RECOMMENDATIONS'
              des='Staff Picks' 
              intro='True stories, tales of courage, historical romances, 
                edge-of-your-seat thrillers... There is a huge world of 
                books out there. Our expert staff members pick out their 
                favorites to help you find your next one.' />
          </div>
          <div key='HeroImageContainer' className='hero__container__image-container'>
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
};

export default Radium(Hero);
