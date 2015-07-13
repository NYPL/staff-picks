// Import libraries
import React from 'react';
import Radium from 'radium';

import SocialMediaNode from 'components/Footer/SocialMedia/SocialMediaNode.jsx'

class SocialMediaList extends React.Component {
  // Constructor used in ES6
	constructor(props) {
    super(props);
  }
  render () {
  	var SocialMediaNodes = this.props.data.map ( function ( node ) {
  		return (
			<SocialMediaNode name={node.name} link={node.link} />
		);
  	});
		return (
			<div className={this.props.className} style={this.props.style}>
				{SocialMediaNodes}
			</div>
		);
	};
};

// <ul key='SocialMedia' id='SocialMedia' className='SocialMedia' style={styles.SocialMedia}>
// 	<li id="facebook">
// 		<a className="icon-facebook" style={styles.SocialMediaLi} href="http://www.facebook.com/newyorkpubliclibrary"><span class="replaced-text">Facebook</span></a>
// 	</li>
// 	<li id="twitter">
// 		<a className="icon-twitter2" style={styles.SocialMediaLi} href="http://twitter.com/nypl"><span class="replaced-text">Twitter</span></a>
// 	</li>
// 	<li id="tumblr">
// 		<a className="icon-tumblr2" style={styles.SocialMediaLi} href="http://nypl.tumblr.com/"><span class="replaced-text">Tumblr</span></a>
// 	</li>
// 	<li id="pinterest">
// 		<a className="icon-pinterest ext" style={styles.SocialMediaLi} href="http://pinterest.com/nypl"><span class="replaced-text">Pinterest</span></a>
// 	</li>
// </ul>

export default Radium(SocialMediaList);