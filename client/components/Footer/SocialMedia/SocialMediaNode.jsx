// Import libraries
import React from 'react';
import Radium from 'radium';

class SocialMediaNode extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }
  render () {
			return (
	      <li key='SocialMediaNode' style={styles.SocialMediaNode} >
		      <a key='SocialMediaLink' className={this.props.className} style={styles.SocialMediaLink} href={this.props.link}>
			      <span className='replaced-text'>
							{this.props.name}
						</span>
					</a>
	      </li>
			);
	};
};

const styles = {
	SocialMediaNode: {
		display: 'inline-block'
	},
	SocialMediaLink: {
		color: '#ffffff',
	  textDecoration: 'none'
	}
}

export default Radium(SocialMediaNode);