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
	      <p key='FooterLinkListNode' className='FooterLinkListNode' style={styles.FooterLinkListNode}>
		      <a key='NodeUrl' className='NodeUrl' href={this.props.link} style={styles.FooterLinkListLink}>
						{this.props.name}
					</a>
	      </p>
			);
	};
};

const styles = {
	FooterLinkListLink: {
		color: '#ffffff',
	  textDecoration: 'none',
		':hover': {
			textDecoration: 'underline'
		}
	},
	FooterLinkListNode: {
		fontFamily:'Lato, Lucida Grande, Helvetica, Arial, sans-serif',
    fontHeigh: '1.5px',
    fontWeight: '300px',
	  marginBottom: '20px'
	}
};

export default Radium(FooterLinkListNode);