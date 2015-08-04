// Import libraries
import React from 'react';
import Radium from 'radium';

// Import components
import SocialMediaList from './SocialMedia/SocialMediaList.jsx'
import FooterLinkList from './FooterLinkLists/FooterLinkList.jsx'

class Footer extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }
  render () {
	  	var FooterLinkLists = data.FooterLinkLists.map ( function ( link, i ) {
	  		return (
					<FooterLinkList className={link.ulClass} data={link.FooterLinkList} key={i}/>
				);
	  	}); 
		return (
			<footer id={this.props.id} className={this.props.className} >
				<SocialMediaList 
					data={data.SocialMedia} 
					id='SocialMediaList' 
					className='socialmedia' />
				<div className='footerlinks'>
					{FooterLinkLists}				
				</div>
				<div id='copyright' className='copyright' >
					<p className='ng-binding'>© The New York Public Library, {new Date().getFullYear()}</p>
				</div>
			</footer>
    );
  }
};

Footer.defaultProps = {
  id: 'footer',
  className: 'ng-isolate-scope',
  label: '',
  lang: 'en',
};

const styles = {};

const data = {
	SocialMedia: [
		{name: 'Facebook', link: 'http://www.facebook.com/newyorkpubliclibrary', className: 'icon-facebook'},
		{name: 'Twitter', link: 'http://twitter.com/nypl', className: 'icon-twitter2'},
		{name: 'Tumblr', link: 'http://nypl.tumblr.com/', className: 'icon-tumblr2'},
		{name: 'Pinterest', link: 'http://pinterest.com/nypl', className: 'icon-pinterest'}
	],
	FooterLinkLists: [
		{FooterLinkList: [
			{name: 'About NYPL', link: '/help/about-nypl', className: 'footer1'},
			{name: 'President and Leadership', link: '/help/about-nypl/president-and-leadership'},
			{name: 'Space Rental', link: '/spacerental'},
			{name: 'Careers at NYPL', link: '/help/about-nypl/careers-nypl'},
			{name: 'Resources for Teachers', link: '/help/getting-oriented/resources-teachers'}
		],
		ulClass: ''},
		{FooterLinkList: [
			{name: 'E-Newsletters', link: '/eNews', className: 'footer1'},
			{name: 'Media Center', link: '/help/about-nypl/media-center'},
			{name: 'Connect with NYPL', link: '/voices/connect-nypl'},
			{name: 'Mobile Apps', link: '/mobile-help'},
			{name: 'Reserve a PC', link: '/help/computers-internet-and-wireless-access/reserving-computer'}
		],
		ulClass: ''},
		{FooterLinkList: [
			{name: 'The Library Shop', link: 'http://shop.nypl.org/', className: 'footer1'},
			{name: 'Privacy Policy', link: '/help/about-nypl/legal-notices/privacy-policy'},
			{name: 'Rules and Regulations', link: '/help/about-nypl/legal-notices/rules-and-regulations'},
			{name: 'Using the Internet', link: '/help/computers-internet-and-wireless-access/a-safety-net-for-the-internet'},
			{name: 'Gifts of Materials to NYPL', link: '/help/about-nypl/legal-notices/policy-gifts-materials'},
		],
		ulClass: ''},
		{FooterLinkList: [
			{name: 'Español', link: '/node/57438', className: 'footer1'},
			{name: '中文', link: '/node/107747', className: 'footer1'},
			{name: 'русский', link: '/node/107749', className: 'footer1'}
		],
		ulClass: 'last'}
	]
};

export default Radium(Footer);
