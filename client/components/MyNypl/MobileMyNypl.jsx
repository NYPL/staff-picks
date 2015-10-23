import React from 'react';
import Radium from 'radium';

import gaUtils from '../../utils/gaUtils.js';

class MobileMyNypl extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    let catalogLinkClass = 'CatalogLink',
      classicLinkClass = 'ClassicLink';

    return (
      <div className={this.props.className} style={styles.base}>
        <p style={styles.selectExp}>Select your experience</p>
        <a href={this.props.catalogLink} className={catalogLinkClass}
          style={styles.links} onClick={gaUtils._trackEvent.bind(this, 'Mobile Log In', 'Catalog')}>
          <span className={`${catalogLinkClass}-Wrapper`} style={[styles.wrapper, styles.catalogLinkWrapper]}>
            <span className={`${catalogLinkClass}-Icon nypl-icon-login`} style={styles.icon}></span>
            <span className={`${catalogLinkClass}-Label`} style={[styles.label, styles.catalogLinkLabel]}>
              Log into the Catalog
            </span>
          </span>
        </a>
        <a href={this.props.classicLink} className={classicLinkClass}
          style={styles.links} onClick={gaUtils._trackEvent.bind(this, 'Mobile Log In', 'Classic')}>
          <span className={`${classicLinkClass}-Wrapper`} style={[styles.wrapper, styles.classicLinkWrapper]}>
            <span className={`${classicLinkClass}-Icon nypl-icon-bldg`} style={styles.icon}></span>
            <span className={`${classicLinkClass}-Label`} style={[styles.label, styles.classicLinkLabel]}>
              Log into the Classic Catalog
            </span>
          </span>
        </a>
        <a className='Mobile-Catalog-Info' href={this.props.infoLink} lang={this.props.lang}
          onClick={gaUtils._trackEvent.bind(this, 'Mobile Log In', 'Catalog Info')}
          style={[
            styles.catalogInfoLink,
          ]}>
            Catalog Info
          </a>
      </div>
    );
  }
}

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  catalogLink: 'https://browse.nypl.org/iii/encore/myaccount',
  classicLink: 'http://catalog.nypl.org/patroninfo',
  infoLink: 'http://www.nypl.org/online-catalog-changes'
};

const styles = {
  base: {
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  links: {
    display: 'inline-table',
    backgroundColor: '#E43534',
    color: '#FFF',
    padding: 0,
    margin: 0,
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none'
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block'
  },
  selectExp: {
    fontStyle: 'italic',
    fontSize: '25px',
    padding: '25px 20px',
    margin: '0px',
    color: '#959595'
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  catalogInfoLink: {
    display: 'block',
    color: '#fff',
    textAlign: 'center',
    padding: '35px',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'underline'
  },
  classicLinkWrapper: {
    borderLeft: '1.25px solid #b92b1a'
  },
  classicLinkLabel: {
    width: '120px'
  },
  catalogLinkWrapper: {
    borderRight: '1.25px solid #b92b1a'
  },
  catalogLinkLabel: {
    width: '102px'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.6)'
  }
};

export default Radium(MobileMyNypl);