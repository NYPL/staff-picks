// Import libraries
import React from 'react';
import Radium from 'radium';

import FooterLinkListNode from 'components/Footer/FooterLinkLists/FooterLinkListNode.jsx'

class FooterLinkList01 extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }

  render () {
  	var FooterLinkListNodes = this.props.data.map ( function ( node ) {
  		return (
				<FooterLinkListNode name={node.name} link={node.link} />
			);
  	});
		return (
			<div className={this.props.className} style={this.props.style}>
				{FooterLinkListNodes}
			</div>
		);
	};
};

const styles = {
	
}

export default Radium(FooterLinkList01);