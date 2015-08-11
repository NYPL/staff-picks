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
          styles.base,
          this.props.style
        ]}>
        <h3 key='HeroTitle' style={styles.base, styles.HeroTitle}>{this.props.title}</h3>
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
    marginTop: '0px',
    marginBottom: '0px',
    position: 'relative',
    width: '100%'
  },
  HeroTitle: {
    '@media (max-width: 414px)': { marginTop: '24px' },
    fontFamily: "'KievitWeb-Bold', sans-serif",
    letterSpacing: '0.09rem',
    fontSize: '12px',
    fontWeight: 'normal',
    marginTop: '0px',
    marginBottom: '20px',
    textTransform: 'uppercase'
  },
   HeroDes: {
    '@media (min-width: 768px) and (max-width: 979px)': { fontSize: '28px', lineHeight: '28px' },
    '@media (max-width: 767px)': { fontSize: '20px', lineHeight: '24px' },
    '@media (max-width: 414px)': { display: 'none' },
    fontFamily: 'MiloSlabPro, RobotoSlabLight, serif',
    fontSize: '36px',
    lineHeight: '36px',
    marginBottom: '20px' 
  },
  HeroIntro: {
    '@media (min-width: 768px) and (max-width: 979px)': { fontSize: '14px' },
    '@media (max-width: 767px)': { fontSize: '14px' },
    '@media (max-width: 414px)': { display: 'none' },
    fontFamily: "'KievitWeb-Book', sans-serif",
    fontSize: '15px' 
  }
};

export default Radium(HeroTitle);
