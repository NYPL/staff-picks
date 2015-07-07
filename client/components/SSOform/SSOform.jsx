import Radium from 'radium';
import React from 'react';
import InputField from '../InputField/InputField.jsx';
import cookie from 'react-cookie';

class SSOSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remember: (!!this.props.remember) || false
    }
  }

  render() {
    let container1 = {
        width: '145px',
        float: 'left',
        padding: '7px'
      },
      container2 = {
        width: '95px',
        float: 'left',
        padding: '7px 0'
      },
      checkbox = {
        display: 'inline-block',
        fontSize: '8px',
        padding: '7px 0',
        color: '#fff'
      },
      formText = {
        display: 'inline-block',
        fontSize: '8px',
        padding: '7px 0',
        marginTop: '7px',
        color: '#fff'
      };

    return (
      <div id='login-form'> 
        <form action='/' method='post' id='bc-sso-login-form--2' acceptCharset='UTF-8' onSubmit={this.submitSSO.bind(this)}>
          <div style={container1}>
            <InputField type='text' style={{width:'145px'}} id='username' name='name'
              ref='username' placeholder='User Name or Barcode' />
            <div style={checkbox}>
              <input type='checkbox' id='remember_me' name='remember_me'
                checked={this.state.remember}
                onChange={this._remember_me.bind(this)}
                className='form-checkbox' ref='remember' />
              <label className='option' htmlFor='remember_me'>Remember me </label>
            </div>
          </div>
          <div style={container2} >
            <InputField style={{width:'85px'}} type='password' id='pin'
              name='user_pin' size='60' maxLength='128' ref='pin'
              className='form-text' autoComplete='off' placeholder='PIN' />
            <div style={formText}>
              <a href='https://nypl.bibliocommons.com/user/forgot' className='forgotpin-button'>Forgot your PIN?</a>
            </div>
          </div>
          <div style={container2} >
            <InputField type='hidden' name='destination' value='http://www.nypl.org/' />
            <InputField
              id='login-form-submit' 
              type='submit'
              name='op'
              value='Log In'
              className='form-submit'
              style={styles.submitButton} />
            <div style={formText}>
              <a href='http://www.nypl.org/help/library-card' className='createacct-button'>Create an Account</a>
            </div>
          </div>
        </form>
      </div>
    );
  }

  _remember_me(e) {
    this.setState({remember: e.target.checked});
  }

  submitSSO(e) {
    e.preventDefault();

    var data = {
      username: React.findDOMNode(this.refs.username).value,
      pin:      React.findDOMNode(this.refs.pin).value,
      remember: this.state.remember,
    }

    if (data.remember) {
      cookie.save('remember_me', {
        path: '/'
      });
    } else {
      cookie.remove('remember_me');
    }
  }
}

class SSOLoggedInMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_location: 'http://nypl.org',
      logout_url: `https://nypl.bibliocommons.com/user/logout?destination=${this.current_location}`
    };
  }

  render() {
    return (
      <ul className="logged-in-menu" style={styles.SSOLoggedInMenu}>
        <li style={styles.li}><a style={styles.a} href="http://nypl.bibliocommons.com/user/account">Personal Information</a></li>
        <li style={styles.li}><a style={styles.a} href="http://nypl.bibliocommons.com/user/saved_searches">Saved Searches</a></li>
        <li style={styles.li}><a style={styles.a} href="http://nypl.bibliocommons.com/user/preferences">Preferences</a></li>
        <li style={styles.li}><a style={styles.a} href="http://nypl.bibliocommons.com/user/privacy">Privacy</a></li>
        <li style={styles.li}><a style={styles.a} href="http://nypl.bibliocommons.com/user/reminders">Reminders</a></li>
        <li style={styles.li}><a style={styles.a} href="http://nypl.bibliocommons.com/communitycredits">Community Credits</a></li>
        <li style={styles.li}><a style={styles.a} href="http://nypl.bibliocommons.com/carts/order_history">Order History</a></li>
        <li style={styles.li}><a style={styles.a} href={this.state.logout_url} id="sso-logout">Log out</a></li>
      </ul>
    );
  }
}


class SSOform extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='sso-login signIn-up-arrow'
          style={[
            styles.base,
            this.props.style,
            this.props.display ? styles.display : styles.hide
          ]}>
        {this.props.loggedIn ? <SSOLoggedInMenu /> : <SSOSignIn remember={this.props.remember} />}
      </div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: '#666',
    position: 'absolute',
    width: '355px',
    top: '35px',
    left: '-150px',
    zIndex: '1000',
  },
  display: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  submitButton: {
    display: 'inline-block',
    backgroundColor: '#333',
    border: 'none',
    color: 'white',
    height: '37px',
    fontSize: '13px',
    width: '85px'
  },
  SSOLoggedInMenu: {
    width: '180px',
    border: '2px solid #5e564b',
    backgroundColor: '#e5e1da',
    position: 'absolute',
    listStyleType: 'none',
    right: '143px',
    top: '-1px',
    zIndex: '4',
    padding: '12px 10px'
  },
  li: {
      margin: '5px 0px'
    },
  a: {
    margin: '0px',
    padding: '0px',
    color: '#000000',
    fontSize: '11px',
    float: 'none',
    textDecoration: 'none'
  }
};

export default Radium(SSOform);
