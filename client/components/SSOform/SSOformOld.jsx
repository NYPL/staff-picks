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

    return (
      <div className='login-form'> 
        <form action="/" method="post" id="bc-sso-login-form--2" acceptCharset="UTF-8" onSubmit={this.submitSSO.bind(this)}>
          <div>
            <div className="form-item form-type-textfield form-item-name">
              <label htmlFor="username">Username or bar code: </label>
              <input type="text" id="username" name="name" size="60" maxLength="128" className="form-text" autoComplete="off"
                style={{'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+g' +
                  'vaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDiIqO1Am6gAAAb1JREFUOMvNkk1rU0EUhp8zd0gCrdKFNgiCFatiIYgUKdW6aikuh' +
                  'IJF6kJcdFFEXAclzM0XJH9A6EL8BSoqZlEQCl0GEQU/qApdiYouKmgUbu7luGgC+boUuvLdvcPMc86c88J/p2w2e9g5d7btnXNTzrlM3H3TaZxzt1' +
                  'Kp1KaI3AcEEBFZFZFXvu9XBgFsjw9EZAjIOOeWVDUUkTMAqvppEEB6ve/7GyJyAfioqpGInALWi8XibCwgl8sdMcbsbzabf621Y8aYNRHxWpUjYFF' +
                  'Vv4vIcBiGPyqVyuuuL1hrbwM3kslkf4Ud0BORnWattfeAld4hmr1uTVrTn1TVg6r6U0RGPc97DJh21V0Bncrn88+BOVV9Y4zp2v/w0RkWzo2w8aDG' +
                  '52BwDq4Ccy1b7iInJrh2fZbx8QxjQzFBAk4Aoaq+K5VKDztec3H5MmkAIppxSSyXy6UgCE5HUXQT0Pb58UvLTB34Qm1tE4CwEZ9EqtXq++6TUaYn0' +
                  'xD9YuZ8Gkgwv7LA1t2nbA8C9OsPH16+peGFpA6dZGQfbH/9RiOug379pl57RB1ITCxy58oxXjyrE8StsVOFQkF3w/8DCTuL1wm1OYIAAAAASUVORK' +
                  '5CYII=)',
                  'backgroundAttachment': 'scroll',
                  'backgroundPosition': '100% 50%',
                  'backgroundRepeat': 'no-repeat'}}
                  ref='username' />
            </div>
            <div className="form-item form-type-password form-item-user-pin">
              <label htmlFor="pin">PIN: </label>
              <input type="password" id="pin" name="user_pin" size="60" maxLength="128" className="form-text" autoComplete="off"
                style={{'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+g' +
                  'vaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDiIqO1Am6gAAAb1JREFUOMvNkk1rU0EUhp8zd0gCrdKFNgiCFatiIYgUKdW6aikuh' +
                  'IJF6kJcdFFEXAclzM0XJH9A6EL8BSoqZlEQCl0GEQU/qApdiYouKmgUbu7luGgC+boUuvLdvcPMc86c88J/p2w2e9g5d7btnXNTzrlM3H3TaZxzt1' +
                  'Kp1KaI3AcEEBFZFZFXvu9XBgFsjw9EZAjIOOeWVDUUkTMAqvppEEB6ve/7GyJyAfioqpGInALWi8XibCwgl8sdMcbsbzabf621Y8aYNRHxWpUjYFF' +
                  'Vv4vIcBiGPyqVyuuuL1hrbwM3kslkf4Ud0BORnWattfeAld4hmr1uTVrTn1TVg6r6U0RGPc97DJh21V0Bncrn88+BOVV9Y4zp2v/w0RkWzo2w8aDG' +
                  '52BwDq4Ccy1b7iInJrh2fZbx8QxjQzFBAk4Aoaq+K5VKDztec3H5MmkAIppxSSyXy6UgCE5HUXQT0Pb58UvLTB34Qm1tE4CwEZ9EqtXq++6TUaYn0' +
                  'xD9YuZ8Gkgwv7LA1t2nbA8C9OsPH16+peGFpA6dZGQfbH/9RiOug379pl57RB1ITCxy58oxXjyrE8StsVOFQkF3w/8DCTuL1wm1OYIAAAAASUVORK' +
                  '5CYII=)',
                  'backgroundAttachment': 'scroll',
                  'backgroundPosition': '100% 50%',
                  'backgroundRepeat': 'no-repeat'}}
                  ref='pin' />
            </div>
            <div className="form-item form-type-checkbox form-item-remember-me">
              <input type="checkbox" id="remember_me" onClick={this._remember_me.bind(this)}
                checked={this.state.remember}
                name="remember_me" value="1" className="form-checkbox" />
                <label className="option" htmlFor="remember_me">Remember me </label>
            </div>
            <input type="hidden" name="destination" value="http://www.nypl.org/" />
            <input type="submit" id="login-form-submit" name="op" value="Log In" className="form-submit" />
            <div id="login-form-help" className="login-helptext">
              <a href="https://nypl.bibliocommons.com/user/forgot" className="forgotpin-button">Forgot your PIN?</a>
              <a href="http://www.nypl.org/help/library-card" className="createacct-button">Need an account?</a>
            </div>
            <input type="hidden" name="form_build_id" value="form-tydkOKr234PQ09lFW8Ffwo3vUGLb566Rw7rNZ-BfC3E" />
            <input type="hidden" name="form_id" value="bc_sso_login_form" />
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

    let data = {
        username: React.findDOMNode(this.refs.username).value,
        pin:      React.findDOMNode(this.refs.pin).value,
        remember: this.state.remember,
      },
      url = 'https://nypl.bibliocommons.com/user/login?destination=';

    if (data.remember) {
      cookie.save('remember_me', { path: '/' });
    } else {
      cookie.remove('remember_me');
    }


    url += window.location.href.replace('#', '%23') + '&';
    url += 'name=' + data.username;
    url += '&user_pin=' + data.pin;

    window.location.href = url;
  }
}

class SSOLoggedInMenu extends React.Component {
  constructor(props) {
    super(props);

    this.current_location = window.location.href;
    this.state = {
      current_location: 'http://nypl.org',
      logout_url: `https://nypl.bibliocommons.com/user/logout?destination=${this.current_location}`
    };

    this._logout = this._logout.bind(this);
  }

  render() {
    return (
      <ul className="logged-in-menu">
        <li><a href="http://nypl.bibliocommons.com/user/account">Personal Information</a></li>
        <li><a href="http://nypl.bibliocommons.com/user/saved_searches">Saved Searches</a></li>
        <li><a href="http://nypl.bibliocommons.com/user/preferences">Preferences</a></li>
        <li><a href="http://nypl.bibliocommons.com/user/privacy">Privacy</a></li>
        <li><a href="http://nypl.bibliocommons.com/user/reminders">Reminders</a></li>
        <li><a href="http://nypl.bibliocommons.com/communitycredits">Community Credits</a></li>
        <li><a href="http://nypl.bibliocommons.com/carts/order_history">Order History</a></li>
        <li><a href="#logout" id="sso-logout" onClick={this._logout}>Log out</a></li>
      </ul>
    );
  }

  _logout (e) {
    e.preventDefault();
    window.location = this.state.logout_url;
  }
}


class SSOformOld extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='sso-login'
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
  base: {},
  display: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
};

export default Radium(SSOformOld);
