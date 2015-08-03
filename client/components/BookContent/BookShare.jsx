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
  	switch (value) {
  		case 'fb':
	  	FB.ui({
		    method: 'share',
		    href: window.location.href,
			}, function(response){});
			break;

			case 'twtr':
			console.log('twtr');
			break;
			default:
	}
  }

  render () {
    const book = this.props.book;
    return (
      <div ref='BookContent' className='BookShare' style={styles.BookShare}>
        <li key='fb' onClick={this._handleClick.bind(this, 'fb')} style={[styles.social, styles.facebook]}>
        </li>
        <li key='twtr' onClick={this._handleClick.bind(this, 'twtr')} style={[styles.social,styles.twitter]}>
					
        </li>
        <a href="https://twitter.com/intent/tweet" className="twitter-share-button" style='color: transparent;'>share on twitter</a>
        <li key='tmblr' style={[styles.social,styles.tumblr]}></li>
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
	tumblr: {
	  backgroundImage: 'url("/client/images/social/social.tmblr.init.png")',
	  ':hover': {
      backgroundImage: 'url("/client/images/social/social.tmblr.hover.png")'
	  }
	}
}

export default Radium(BookShare);