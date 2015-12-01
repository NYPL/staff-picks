// Import libraries
import React from 'react';
import Radium from 'radium';

import FooterLinkListNode from './FooterLinkListNode.jsx'

class FooterLinkList extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }

  render () {
  	let FooterLinkListNodes = this.props.data.map(function (node, i) {
  		return (
				<FooterLinkListNode name={node.name} link={node.link} className={node.className} key={i} />
			);
  	});

		return (
			<ul className={this.props.className}>
				{FooterLinkListNodes}
			</ul>
		);
	}
}

export default Radium(FooterLinkList);
