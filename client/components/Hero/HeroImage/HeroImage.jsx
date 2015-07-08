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
		<ImageComponent id={this.props.id} className={this.props.className} style={styles.HeroImage} src={src.HeroImageLink} />
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
    height: '220%',
    margin: '-10% 40% 0 0',
    width: 'auto'
  }
};

const src = {
  HeroImageLink: 'https://chicago.bibliocms.com/wp-content/uploads/sites/3/2015/01/kccover.png'
};

export default Radium(HeroImage);