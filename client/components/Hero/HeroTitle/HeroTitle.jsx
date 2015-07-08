import React from 'react';
import Radium from 'radium';

class HeroTitle extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div
      id={this.props.id}
      className={this.props.className}
      style={[
        styles.base,
        this.props.style
      ]}>
        <h3 key='HeroTitle' style={styles.base, styles.HeroTitle}>{this.props.title}</h3>
        <p key='HeroDes' style={styles.base, styles.HeroDes}>{this.props.intro}</p>
      </div>
    );
  }
};

HeroTitle.defaultProps = {
  id: 'HeroTitle',
  className: 'HeroTitle',
  label: '',
  lang: 'en',
};

const styles = {
  base: {
    boxSizing: 'border-box',
    color: 'white',
    fontFamily: 'KievitComp-Book',
    marginTop: '0px',
    marginBottom: '0px',
    position: 'relative',
    width: '100%'
  },
  HeroTitle: {
    '@media (max-width: 568px)': { marginTop: '24px' },
    fontFamily: 'KievitComp-Bold',
    marginTop: '0px',
    marginBottom: '4px',
    textTransform: 'uppercase'
  },
  HeroDes: {
    '@media (max-width: 568px)': { display: 'none' },
    fontSize: '1.5em',
    lineHeight: '1.2em', 
  }
};

export default Radium(HeroTitle);