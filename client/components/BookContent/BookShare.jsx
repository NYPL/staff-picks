import React from 'react';
import Radium from 'radium';

class BookShare extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    // Actions of mouse click event assigned to the class
    this._handleClick = this._handleClick.bind(this);
  }

  // Actions of click event
  _handleClick (value) {
  }

  render () {
    const book = this.props.book;
    return (
      <div ref='BookContent' className='BookShare' style={styles.BookShare}>
        <li key='fb' style={[styles.social, styles.facebook]}>
	        <a href={shareLinks.facebook} target='_blank' style={styles.shareLink} label='Share on facebook'></a>
        </li>
        <li key='twtr' style={[styles.social, styles.twitter]}>
					<a href={shareLinks.twitter} style={styles.shareLink} label='Share on twitter'></a>
        </li>
        <li key='tumblr' style={[styles.social, styles.tumblr]}>
	        <a href={shareLinks.tumblr} target='_blank' style={styles.shareLink}></a>
	      </li>
      </div>
    );
  }
};

const styles={
	BookShare: {
		margin: '0 0 0 4px'
	},
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
	  backgroundImage: 'url("/client/images/social/social.fb.init.png")',
	  ':hover': {
      backgroundImage: 'url("/client/images/social/social.fb.activeInit.png")'
	  }
	},
	twitter: {
	  backgroundImage: 'url("/client/images/social/social.twtr.init.png")',
	  ':hover': {
      backgroundImage: 'url("/client/images/social/social.twtr.hover.png")'
	  }
	},
	shareLink :{
		color: 'transparent',
		display: 'inline-block',
		height: '61px',
	  width: '60px',

	},
	tumblr: {
	  backgroundImage: 'url("/client/images/social/social.tmblr.init.png")',
	  ':hover': {
      backgroundImage: 'url("/client/images/social/social.tmblr.hover.png")'
	  }
	}
}

let	shareUrl=window.location.href;

const shareLinks={
	facebook: `http://www.facebook.com/sharer.php?u=${shareUrl}&t=Share%20This%20Book%20on%20Facebook`,
	twitter:`https://twitter.com/intent/tweet?text=Share%20This%20Book%20on%20Twitter&url=${shareUrl}`,
	tumblr: `https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=${shareUrl}&title=NYPL%20Staff%20Picks&caption=Every%20month%20NYPL's%20librarians%20share%20their%20favorite%20reads.`
}

export default Radium(BookShare);