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
	      <li key='FooterLinkListNode' className='FooterLinkListNode' style={styles.FooterLinkListNode}>
		      <a key='NodeUrl' className='NodeUrl' href={this.props.link}>
						{this.props.name}
					</a>
	      </li>
			);
	};
};

const styles = {
	FooterLinkListNode: {
		display: 'inline-block'
	}
};

export default Radium(FooterLinkListNode);