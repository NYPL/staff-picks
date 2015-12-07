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

    this.state = {};
  }

  render() {    
    return (
      <div key='Hero' className={this.props.className}>
        <div key='HeroContainer' className={`${this.props.className}__container`}>
          <div key='TextContainer' className={`${this.props.className}__text`}>
            <HeroTitle className={`${this.props.className}__text__HeroTitle`}
              title='RECOMMENDATIONS'
              des='Staff Picks' 
              intro='True stories, tales of courage, historical romances,
                edge-of-your-seat thrillers... There is a huge world of books
                out there. Our expert staff members pick out their favorites
                to help you find your next one.' />
          </div>
          <div key='HeroImageContainer' className={`${this.props.className}__image`}>
          </div>
        </div>
      </div>
    );
  }
};

Hero.defaultProps = {
  className: 'Hero',
};

export default Radium(Hero);
