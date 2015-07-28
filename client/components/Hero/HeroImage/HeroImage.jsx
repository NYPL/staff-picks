import React from 'react';
import Radium from 'radium';

import ImageComponent from '../../ImageComponent/ImageComponent.jsx';

class HeroImage extends React.Component {
	// Constructor used in ES6
	constructor(props) {
		super(props);
	}

  render () {
  	return (
		<ImageComponent id={this.props.id} className={this.props.className} style={styles.HeroImage} src={this.props.src} />
	);
  }
};

HeroImage.defaultProps = {
  id: 'HeroImage',
  className: 'HeroImage',
  label: '',
  lang: 'en',
};

const styles = {
  HeroImage: {
    display: 'inline',
    height: 'auto',
    margin: '0 0 0 0',
    width: '430px'
  }
};

export default Radium(HeroImage);