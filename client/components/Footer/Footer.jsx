// Import libraries
import React from 'react';
import Radium from 'radium';

// Import components
import SocialMediaList from 'components/Footer/SocialMedia/SocialMediaList.jsx'
import FooterLinkList from 'components/Footer/FooterLinkLists/FooterLinkList.jsx'

class Footer extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }
  render () {
	  	var FooterLinkLists = data.FooterLinkLists.map ( function ( link ) {
	  		return (
				<FooterLinkList className='FooterLinkList' style={styles.FooterLinkList} data={link.FooterLinkList} />
			);
	  	}); 
		return (
			<div id={this.props.id} className={this.props.className} style={styles.base}>
				<SocialMediaList 
					key='SocialMediaList' 
					data={data.SocialMedia} 
					id='SocialMediaList' 
					className='SocialMediaList' 
					style={styles.SocialMediaList} />
            
				{FooterLinkLists}				
				
				<div key='Copyright' id='Copyright' className='Copyright' style={styles.base, styles.Copyright}>
					<p style={styles.base, styles.Copyright.p}>© The New York Public Library, {new Date().getFullYear()}</p>
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
	    color: '#ffffff',
	    display: 'block',
	    fontFamily:'Lato, Lucida Grande, Helvetica, Arial, sans-serif',
	    fontHeigh: '1.5px',
	    fontWeight: '300px',
	    fontSize: '1em',
	    marginTop: '20px',
        padding: '30px 20px 100px',
	    position: 'relative'
	},
	SocialMediaList: {
		float: 'right',
		marginRight: '20px',
		position: 'absolute',
		right: '0px',
		textAlign: 'right',
	},
	FooterLinkList: {
		display: 'block',
		float: 'left',
		margin: '0px',
		width: '20%'
	},
	Copyright: {
    background: 'url(http://cdn-prod.www.aws.nypl.org/sites/all/themes/nypl_new/images/main-logo-lion.png) no-repeat',
    backgroundSize: '60px',
    backgroundPosition: '50%',
		clear: 'both',
	  lineHeight: '1.5',
    letterSpacing: '.07em',
    textAlign: 'center',
    p: {
			fontSize: '14px',
			fontWeight: '300px',
	    paddingTop: '30px',
	    paddingBottom: '140px',
	   }
	}
};

const data = {
	SocialMedia: [
		{name: 'Facebook', link: 'http://www.facebook.com/newyorkpubliclibrary', className: 'icon-facebook'},
		{name: 'Twitter', link: 'http://www.facebook.com/newyorkpubliclibrary', className: 'icon-twitter2'},
		{name: 'Tumblr', link: 'http://www.facebook.com/newyorkpubliclibrary', className: 'icon-tumblr2'},
		{name: 'Pinterest', link: 'http://www.facebook.com/newyorkpubliclibrary', className: 'icon-pinterest'}
	],
	FooterLinkLists: [
		{FooterLinkList: [
			{name: 'About NYPL', link: '/help/about-nypl'},
			{name: 'President and Leadership', link: '/help/about-nypl/president-and-leadership'},
			{name: 'Space Rental', link: '/spacerental'},
			{name: 'Careers at NYPL', link: '/help/about-nypl/careers-nypl'},
			{name: 'Resources for Teachers', link: '/help/getting-oriented/resources-teachers'}
		]},
		{FooterLinkList: [
			{name: 'E-Newsletters', link: '/eNews'},
			{name: 'Media Center', link: '/help/about-nypl/media-center'},
			{name: 'Connect with NYPL', link: '/voices/connect-nypl'},
			{name: 'Mobile Apps', link: '/mobile-help'},
			{name: 'Reserve a PC', link: '/help/computers-internet-and-wireless-access/reserving-computer'}
		]},
		{FooterLinkList: [
			{name: 'The Library Shop', link: 'http://shop.nypl.org/'},
			{name: 'Privacy Policy', link: '/help/about-nypl/legal-notices/privacy-policy'},
			{name: 'Rules and Regulations', link: '/help/about-nypl/legal-notices/rules-and-regulations'},
			{name: 'Using the Internet', link: '/help/computers-internet-and-wireless-access/a-safety-net-for-the-internet'},
			{name: 'Gifts of Materials to NYPL', link: '/help/about-nypl/legal-notices/policy-gifts-materials'},
		]},
		{FooterLinkList: [
			{name: 'Español', link: '/node/57438'},
			{name: '中文', link: '/node/107747'},
			{name: 'русский', link: '/node/107749'},
		]}
	]
};

export default Radium(Footer);