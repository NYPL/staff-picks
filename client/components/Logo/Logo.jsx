import React from 'react';
import Radium from 'radium';

class Logo extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <a
      id={this.props.id}
      className={this.props.className}
      href={this.props.target}
      style={[
        styles.base,
        this.props.style //allows for parent-to-child css styling
      ]}>
        <image src={this.props.src} style={styles.image} />
      </a>
    );
  }
};

Logo.defaultProps = {
  src: 'http://staging.ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/NYPL-logo-black-pos.svg',
  target: 'http://nypl.org',
  id: 'Logo',
  className: 'Logo'
};

const styles = {
  base: {

  },
  image: {
    maxWidth: '100%'
  }
};

export default Radium(Logo);