import React from 'react';
import Radium from 'radium';

class HeroTitle extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className}>
        <h3 key='HeroTitle'>{this.props.title}</h3>
        <p key='HeroDes' className={`${this.props.className}__des`}>
          {this.props.des}
        </p>
        <p key='HeroIntro' className={`${this.props.className}__intro`}>
          {this.props.intro}
        </p>
      </div>
    );
  }
};

export default Radium(HeroTitle);
