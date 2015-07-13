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
			      <span className='replaced-text' style={styles.ReplacedText} >
							{this.props.name}
						</span>
					</a>
	      </li>
			);
	};
};

const styles = {
	SocialMediaNode: {
		display: 'inline-block',
		margin: '0 5 0 0'
	},
	SocialMediaLink: {
		color: '#ffffff',
		fontSize: '24px',
	  textDecoration: 'none',
	},
	ReplacedText: {
   //h5bp technique, to hide the text if the icons show
	  border: '0',
	  clip: 'rect(0 0 0 0)',
	  height: '1px',
	  margin: '-1px',
	  overflow: 'hidden',
	  padding: '0',
	  position: 'absolute',
	  width: '1px'
	}

}

export default Radium(SocialMediaNode);