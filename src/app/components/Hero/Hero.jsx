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
              title='staff picks' des='100 books we love. Every month.' 
              intro='We&#39;re choosing all kinds of books—for readers old and 
                young and in between, and fans of every genre—and serving 
                them up in this browse tool.' />
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
