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
		  <ImageComponent id={this.props.id} className={this.props.className} />
    );
  }
};


const styles = {
};

export default Radium(HeroImage);
