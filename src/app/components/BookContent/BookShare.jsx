import React from 'react';
import radium from 'radium';

import utils from '../../utils/utils.js';

const styles = {
  social: {
    display: 'inline-block',
    margin: '-12px 0 0 -5px',
    position: 'relative',
    height: '61px',
    width: '60px',
    ':hover': {
      cursor: 'pointer',
      zIndex: '99',
    },
    '@media (max-width: 414px)': {
      margin: '0 0 0 -5px',
    },
  },
  facebook: {
    backgroundImage: 'url("/browse/recommendations/staff-picks/src/client/' +
      'images/social/social.fb.init.png")',
    ':hover': {
      backgroundImage: 'url("/browse/recommendations/staff-picks/src/client/' +
        'images/social/social.fb.activeInit.png")',
    },
  },
  twitter: {
    backgroundImage: 'url("/browse/recommendations/staff-picks/src/client/' +
      'images/social/social.twtr.init.png")',
    ':hover': {
      backgroundImage: 'url("/browse/recommendations/staff-picks/src/client/' +
        'images/social/social.twtr.hover.png")',
    },
  },
  shareLink: {
    color: 'transparent',
    display: 'inline-block',
    height: '61px',
    width: '60px',
  },
  tumblr: {
    backgroundImage: 'url("src/client/images/social/social.tmblr.init.png")',
    ':hover': {
      backgroundImage: 'url("src/client/images/social/social.tmblr.hover.png")',
    },
  },
};

class BookShare extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    const shareUrl = window.location.href;
    const via = 'NYPL';
    const bookTitle = this.props.book.item.title;
    const shareType = this.props.shareType;
    let nyplStaffPick = '';
    let shareText;

    if (!shareType) {
      shareText = 'Staff Picks %7C The New York Public Library -';
    } else if (shareType.type === 'childrens') {
      shareText = 'NYPL Children\'s Books of 2015:';
    } else {
      shareText = 'NYPL Teen Books of 2015:';
    }

    nyplStaffPick = `${shareText} ${bookTitle}`;

    this.state = {
      facebook: `http://www.facebook.com/sharer.php?u=${nyplStaffPick}&t=${nyplStaffPick}`,
      twitter: `https://twitter.com/intent/tweet?text=${nyplStaffPick}&url=${shareUrl}&via=${via}`,
      tumblr: `https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=${shareUrl}` +
        '&title=NYPL%20%7C%20Staff%20Picks&caption=Every+month%2C+NYPL%27s+book+experts+share' +
        `+100+titles+they+love.&show-via=${via}`,
    };
  }

  render() {
    const book = this.props.book;
    const bookTitle = book.item.title;

    return (
      <div ref="BookContent" className={this.props.className} style={styles.BookShare}>
        <li
          key="fb"
          style={[styles.social, styles.facebook]}
          onClick={() => utils.trackPicks('Social Sharing', `Facebook: ${bookTitle}`)}
        >
          <a
            href={this.state.facebook}
            target="_blank"
            style={styles.shareLink}
            label="Share on Facebook"
          >
          </a>
        </li>
        <li
          key="twtr"
          style={[styles.social, styles.twitter]}
          onClick={() => utils.trackPicks('Social Sharing', `Twitter: ${bookTitle}`)}
        >
          <a href={this.state.twitter} style={styles.shareLink} label="Share on twitter"></a>
        </li>
        <li
          key="tumblr"
          style={[styles.social, styles.tumblr]}
          onClick={() => utils.trackPicks('Social Sharing', `Tumblr: ${bookTitle}`)}
        >
          <a href={this.state.tumblr} target="_blank" style={styles.shareLink}></a>
        </li>
      </div>
    );
  }
}

BookShare.propTypes = {
  book: React.PropTypes.object,
  className: React.PropTypes.string,
  shareType: React.PropTypes.object,
};

export default radium(BookShare);
