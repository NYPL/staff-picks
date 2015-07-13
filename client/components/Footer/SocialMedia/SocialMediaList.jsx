// Import libraries
import React from 'react';
import Radium from 'radium';

import SocialMediaNode from 'components/Footer/SocialMedia/SocialMediaNode.jsx'

class SocialMediaList extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }
  render () {
  	var SocialMediaNodes = this.props.data.map ( function ( node ) {
  		return (
			<SocialMediaNode name={node.name} link={node.link} className={node.className} />
		);
  	});
		return (
			<div className={this.props.className} style={this.props.style}>
				{SocialMediaNodes}
			</div>
		);
	};
};

export default Radium(SocialMediaList);