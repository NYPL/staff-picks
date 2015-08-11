import React from 'react';
import Radium from 'radium';

class HeroTitle extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div id={this.props.id} className={this.props.className}
        style={[
          this.props.style
        ]}>
        <h3 key='HeroTitle'>{this.props.title}</h3>
        <p key='HeroDes' className='hero__container__text-container__title__des'>{this.props.des}</p>
        <p key='HeroIntro' className='hero__container__text-container__title__intro'>{this.props.intro}</p>
      </div>
    );
  }
};

const styles = {
};

export default Radium(HeroTitle);
