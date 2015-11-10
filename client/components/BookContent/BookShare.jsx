import React from 'react';
import Radium from 'radium';

import utils from '../../utils/utils.js';

class BookShare extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    let shareUrl = window.location.href,
        via = 'NYPL',
        nyplStaffPick = `Staff Picks %7C The New York Public Library - ${this.props.book['item']['attributes']['title']}`;

     this.state = {
      facebook: `http://www.facebook.com/sharer.php?u=${nyplStaffPick}&t=${nyplStaffPick}`,
      twitter: `https://twitter.com/intent/tweet?text=${nyplStaffPick}&url=${shareUrl}&via=${via}`,
      tumblr: `https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=${shareUrl}` +
      `&title=NYPL%20%7C%20Staff%20Picks&caption=Every+month%2C+NYPL%27s+book+experts+share+100+titles+they+love.` +
      `&show-via=${via}`
    }
  }

  render () {
    return (
      <div ref='BookContent' className={this.props.className} style={styles.BookShare}>
        <li key='fb' style={[styles.social, styles.facebook]}
          onClick={utils._trackPicks.bind(this, 'Social Sharing', 'Facebook')}>
	        <a href={this.state.facebook} target='_blank' style={styles.shareLink} label='Share on facebook'></a>
        </li>
        <li key='twtr' style={[styles.social, styles.twitter]}
          onClick={utils._trackPicks.bind(this, 'Social Sharing', 'Twitter')}>
					<a href={this.state.twitter} style={styles.shareLink} label='Share on twitter'></a>
        </li>
        <li key='tumblr' style={[styles.social, styles.tumblr]}
          onClick={utils._trackPicks.bind(this, 'Social Sharing', 'Tumblr')}>
	        <a href={this.state.tumblr} target='_blank' style={styles.shareLink}></a>
	      </li>
      </div>
    );
  }
};

const styles={
	social: {
    display: 'inline-block',
	  margin: '-12px 0 0 -5px',
	  position: 'relative',
	  height: '61px',
	  width: '60px',
	  ':hover': {
      cursor: 'pointer',
      zIndex: '99'
	  },
	  '@media (max-width: 414px)': {
			margin: '0 0 0 -5px',
	  },
	},
	facebook: {
	  backgroundImage: 'url("/recommendations/staff-picks/client/images/social/social.fb.init.png")',
	  ':hover': {
      backgroundImage: 'url("/recommendations/staff-picks/client/images/social/social.fb.activeInit.png")'
	  }
	},
	twitter: {
	  backgroundImage: 'url("/recommendations/staff-picks/client/images/social/social.twtr.init.png")',
	  ':hover': {
      backgroundImage: 'url("/recommendations/staff-picks/client/images/social/social.twtr.hover.png")'
	  }
	},
	shareLink :{
		color: 'transparent',
		display: 'inline-block',
		height: '61px',
	  width: '60px',
	},
	tumblr: {
	  backgroundImage: 'url("/recommendations/staff-picks/client/images/social/social.tmblr.init.png")',
	  ':hover': {
      backgroundImage: 'url("/recommendations/staff-picks/client/images/social/social.tmblr.hover.png")'
	  }
	}
};


export default Radium(BookShare);
