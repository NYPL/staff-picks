// Import libraries
import React from 'react';
import Radium from 'radium';

// Import components
import SocialMediaList from 'components/Footer/SocialMedia/SocialMediaList.jsx'
import FooterLinkList01 from 'components/Footer/FooterLinkLists/FooterLinkList01.jsx'
import FooterLinkList02 from 'components/Footer/FooterLinkLists/FooterLinkList02.jsx'
import FooterLinkList03 from 'components/Footer/FooterLinkLists/FooterLinkList03.jsx'
import FooterLinkList04 from 'components/Footer/FooterLinkLists/FooterLinkList04.jsx'

class Footer extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }
  render () {
		return (
			<div id={this.props.id} className={this.props.className} style={styles.base}>
				<SocialMediaList 
					key='SocialMediaList' 
					data={data.SocialMedia} 
					id='SocialMediaList' 
					className='SocialMediaList' 
					style={styles.SocialMediaList} />				
				
				<FooterLinkList01 
					key='FooterLinklist01' 
					data={data.FooterLinkList01} 
					id='FooterLinkList01' 
					className='FooterLinkList' style={styles.FooterLinkList} />

					<FooterLinkList02 
					key='FooterLinklist02' 
					data={data.FooterLinkList02} 
					id='FooterLinkList02' 
					className='FooterLinkList' style={styles.FooterLinkList} />

					<FooterLinkList03 
					key='FooterLinklist03' 
					data={data.FooterLinkList03} 
					id='FooterLinkList03' 
					className='FooterLinkList' style={styles.FooterLinkList} />

					<FooterLinkList04 
					key='FooterLinklists04' 
					data={data.FooterLinkList04} 
					id='FooterLinkList04' 
					className='FooterLinkList' style={styles.FooterLinkList} />
				
				<div key='Copyright' id='Copyright' className='Copyright' style={styles.Copyright}>
				</div>
			</div>
    );
  }
};

Footer.defaultProps = {
  id: 'Footer',
  className: 'Footer',
  label: '',
  lang: 'en',
};

const styles = {
	base: {
		backgroundColor: '#7d7972',
	  clear: 'both',
	  marginTop: '20px',
    padding: '30px 20px 100px',
	  position: 'relative'
	},
	SocialMediaList: {
		marginRight: '20px',
		position: 'absolute',
		right: '0px',
		textAlign: 'right'
	},
	FooterLinkLists: {

	},
	Copyright: {

	}
};

const data = {
	SocialMedia: [
		{name: 'Facebook', link: 'http://www.facebook.com/newyorkpubliclibrary'},
		{name: 'Twitter', link: 'http://www.facebook.com/newyorkpubliclibrary'},
		{name: 'Tumblr', link: 'http://www.facebook.com/newyorkpubliclibrary'},
		{name: 'Pinterest', link: 'http://www.facebook.com/newyorkpubliclibrary'}
	],
	FooterLinkList01: [
		{name: 'About NYPL', link: '/help/about-nypl'}
	],
	FooterLinkList02: [
		{name: 'E-Newsletters', link: '/eNews'}
	],
	FooterLinkList03: [
		{name: 'The Library Shop', link: 'http://shop.nypl.org/'}
	],
	FooterLinkList04: [
		{name: 'Español', link: '/node/57438'}
	],
};

export default Radium(Footer);