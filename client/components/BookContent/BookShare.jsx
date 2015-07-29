import React from 'react';
import Radium from 'radium';

class BookShare extends React.Component {
	  // Constructor used in ES6
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render () {
    const book = this.props.book;

    return (
      <div ref='BookContent' className='BookShare'>
        <li key='fb' style={[styles.social, styles.facebook]}></li>
        <li key='twtr' style={[styles.social,styles.twitter]}></li>
        <li key='tmblr' style={[styles.social,styles.tumblr]}></li>
      </div>
    );
  }

  _handleClick (e) {
    e.preventDefault();
  }
};

const styles={
	BookShare: {

	},
	social: {
      display: 'inline-block',
	  margin: '0 0 0 0',
	  height: '60px',
	  width: '60px',
	  '@media (max-width: 414px)': {
		margin: '10px 0 0 0'
	  },
	},
	facebook: {
	  backgroundImage: 'url("/client/images/social/social.fb.init.png")',
	  ':hover': {
	      backgroundImage: 'url("/client/images/social/social.fb.activeInit.png")',
	      cursor: 'pointer'
	  }
	},
	twitter: {
	  backgroundImage: 'url("/client/images/social/social.twtr.init.png")',
	  ':hover': {
	      backgroundImage: 'url("/client/images/social/social.twtr.hover.png")',
	      cursor: 'pointer'
	  }
	},
	tumblr: {
	  backgroundImage: 'url("/client/images/social/social.tmblr.init.png")',
	  ':hover': {
	      backgroundImage: 'url("/client/images/social/social.tmblr.hover.png")',
	      cursor: 'pointer'
	  }
	}
}

export default Radium(BookShare);