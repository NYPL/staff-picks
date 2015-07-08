// Non-NYPL module imports
import React from 'react';
import Radium from 'radium';

// NYPL module imports
import Logo from '../Logo/Logo.jsx';
import SSOContainer from '../SSOContainer/SSOContainer.jsx';
import DonateButton from '../DonateButton/DonateButton.jsx';
import SubscribeButton from '../SubscribeButton/SubscribeButton.jsx';
import NavMenu from '../NavMenu/NavMenu.jsx';

class Header extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = {
      data: this.props.data
    };
  }

  render () {
    return (
      <header id='header'>
        <div className="header-wrapper">
          <div className='nypl-logo'>
            <Logo className='Header-Logo' style={styles.logo} />
          </div>
        </div>
      </header>
    );
  }
};

Header.defaultProps = {
  lang: 'en'
};

const styles = {
  base: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '175px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    color: 'black'
  },
  logo: {
    display: 'block',
    width: '230px',
    position: 'relative',
    left: '120px'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    right: '70px',
    fontFamily: 'Helvetica, Arial',
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    display: 'flex'
  }
};

export default Radium(Header);
