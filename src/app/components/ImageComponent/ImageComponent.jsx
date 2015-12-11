import React from 'react';
import Radium from 'radium';

class ImageComponent extends React.Component {
	// Constructor used in ES6
	constructor(props) {
		super(props);
  }

  render() {
    return (
      <img
        id={this.props.id}
        className={this.props.className}
        style={this.props.style}
        src={this.props.src} />
    );
  }
};

ImageComponent.defaultProps = {
  id: '',
  className: 'BasicImageComponent',
  label: '',
  lang: 'en'
};

export default Radium(ImageComponent);
