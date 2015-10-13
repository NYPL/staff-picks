// Import libraries
import React from 'react';
import Radium from 'radium';

// Import components
import SocialMediaList from './SocialMedia/SocialMediaList.jsx';
import FooterLinkList from './FooterLinkLists/FooterLinkList.jsx';

class Footer extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }

  render () {
  	let FooterLinkLists = data.FooterLinkLists.map(function (link, i) {
  		return (
				<FooterLinkList className={link.ulClass} data={link.FooterLinkList} key={i}/>
			);
  	});

		return (
			<footer id={this.props.id} className={this.props.className}>
				<SocialMediaList
					data={data.SocialMedia}
					id='SocialMediaList'
					className='socialmedia' />
				<div className='footerlinks'>
					{FooterLinkLists}
				</div>
				<div id='copyright' className='copyright'>
					<p>© The New York Public Library, {new Date().getFullYear()}</p>
				</div>
			</footer>
    );
  }
}

Footer.defaultProps = {
  id: 'footer',
  className: 'ng-isolate-scope',
  label: '',
  lang: 'en'
};

const styles = {};

const data = {
	SocialMedia: [
		{name: 'Facebook', link: 'https://www.facebook.com/nypl', className: 'icon-facebook'},
		{name: 'Twitter', link: 'https://twitter.com/nypl', className: 'icon-twitter2'},
		{name: 'Instagram', link: 'https://instagram.com/nypl', className: 'icon-instagram'},
		{name: 'Tumblr', link: 'https://nypl.tumblr.com/', className: 'icon-tumblr2'},
		{name: 'Youtube', link: 'https://www.youtube.com/user/NewYorkPublicLibrary', className: 'icon-youtube'},
	],
	FooterLinkLists: [
		{
			FooterLinkList: [
				{name: 'About NYPL', link: '/help/about-nypl', className: 'footer1'},
				{name: 'Press', link: '/help/about-nypl/media-center'},
				{name: 'Careers', link: '/careers'},
				{name: 'Space Rental', link: '/spacerental'}
			],
			ulClass: ''
		},
		{
			FooterLinkList: [
				{name: 'Governance', link: '/help/about-nypl/leadership/board-trustees', className: 'footer1'},
				{name: 'Rules & Regulations', link: '/help/about-nypl/legal-notices/rules-and-regulations'},
				{name: 'Policies', link: '/policies'},
				{name: 'Terms & Conditions', link: '/terms-conditions'}
			],
			ulClass: ''
		},
		{
			FooterLinkList: [
				{name: 'Accessibility', link: '/help/community-outreach/services-for-persons-with-disabilities', className: 'footer1'},
				{name: 'Language', link: '/language'},
			],
			ulClass: 'last'
		}
	]
};

export default Radium(Footer);
