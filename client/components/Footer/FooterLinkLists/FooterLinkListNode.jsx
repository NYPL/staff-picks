// Import libraries
import React from 'react';
import Radium from 'radium';

class FooterLinkListNode extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }
  render () {
			return (
				<li className={this.props.className}>
		      <a key='NodeUrl' href={this.props.link} >
						{this.props.name}
					</a>
				</li>
			);
	};
};

const styles = {};

export default Radium(FooterLinkListNode);