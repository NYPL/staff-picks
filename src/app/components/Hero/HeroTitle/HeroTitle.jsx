import React from 'react';
import PropTypes from 'prop-types';

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
  id: PropTypes.string,
  className: PropTypes.string,
  des: PropTypes.string,
  intro: PropTypes.string,
  title: PropTypes.string,
};

export default HeroTitle;
