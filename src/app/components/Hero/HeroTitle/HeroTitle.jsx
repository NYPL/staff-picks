import React from 'react';

const HeroTitle = (props) => (
  <div id={props.id} className={props.className}>
    <h3 key="HeroTitle">{props.title}</h3>
    <p key="HeroDes" className={`${props.className}__des`}>
      {props.des}
    </p>
    <p key="HeroIntro" className={`${props.className}__intro`}>
      {props.intro}
    </p>
  </div>
);

HeroTitle.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  des: React.PropTypes.string,
  intro: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default HeroTitle;
