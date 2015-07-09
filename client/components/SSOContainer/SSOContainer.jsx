import Radium from 'radium';
import React from 'react/addons';
import SSOform from '../SSOform/SSOform.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import cookie from 'react-cookie';
import cx from 'classnames';

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);

    // cookie.save('username', 'edwinguzman');

    this.state = {
      username: this._login(),
      logged_in: !!this._login(),
      remember: this._remember_me(),
      showDialog: false
    };

    this._handleClick = this._handleClick.bind(this);
    this._login = this._login.bind(this);
  }

  render() {
    let showDialog = this.state.showDialog;
    const classes =  cx({ show: showDialog, hide: !showDialog });

    return (
      <div style={styles.base}>
        {this.state.logged_in}
        <SimpleButton
          id='SignInButton'
          label={this.state.username || 'Sign In'}
          style={styles.SimpleButton}
          onClick={this._handleClick}
          target='http://nypl.org' />

        <SSOform
          className={classes}
          show={showDialog}
          display={showDialog}
          loggedIn={this.state.logged_in}
          remember={this.state.remember} /> 
      </div>
    );
  }

  _handleClick(e) {
    e.preventDefault();
    this.setState({showDialog: !this.state.showDialog});
  }

  _login() {
    return cookie.load('username');
  }

  _remember_me() {
    return !!cookie.load('remember_me');
  }
}

const styles = {
  base: {
    position:'relative',
    margin: '0px 5px'
  },
  SimpleButton: {
    padding: '1em',
    display: 'block'
  },
  SSOform: {}
}

export default Radium(SignInContainer);
