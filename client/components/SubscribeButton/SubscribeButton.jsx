import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import EmailSubscription from '../EmailSubscription/EmailSubscription.jsx';

import Store from '../../stores/HeaderStore.js';
import Actions from '../../actions/HeaderActions.js';

import gaUtils from '../../utils/gaUtils.js';

class SubscribeButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state, replaces getInitialState() method
    this.state = {
      subscribeFormVisible: Store._getSubscribeFormVisible()
    };
  }

  componentDidMount() {
    Store.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    Store.unListen(this._onChange.bind(this));
  }

  render () {
    // Assign a variable to hold the reference of state boolean
    let showDialog = this.state.subscribeFormVisible;

    // Dynamic class assignment based on boolean flag
    const buttonClasses = cx({'active': showDialog}),
      emailFormClasses = cx({
        'active animatedFast fadeIn': showDialog
      }),
      iconClass = cx({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

    return (
      <div className='SubscribeButton-Wrapper'
        ref='SubscribeButton'
        style={[
          styles.base,
          this.props.style
        ]}>

        <a
          id={'SubscribeButton'}
          className={`SubscribeButton ${buttonClasses}`}
          href={this.props.target}
          onClick={this._handleClick.bind(this)}
          style={[
            styles.SimpleButton,
            this.props.style
          ]}>
          {this.props.label}
          <span className={`${iconClass} icon`} style={styles.SubscribeIcon}></span>
        </a>

        <div className={`EmailSubscription-Wrapper ${emailFormClasses}`}
          style={[
            styles.EmailSubscribeForm
          ]}>
          <EmailSubscription
            list_id='1061'
            target='https://dev-mailinglistapi.nypl.org' />
        </div>
      </div>
    );
  }

  /* Utility Methods should be declared below the render method */

  // Toggles the visibility of the form. Sends an Action update
  // to the Header Store that will triggger a global update
  // to the reference in the Header Constants.
  _handleClick(e) {
    e.preventDefault();

    if (this.props.target === '#') {
      let visibleState = this.state.subscribeFormVisible ? 'Closed' : 'Open';
      Actions.toggleSubscribeFormVisible(!this.state.subscribeFormVisible);
      
      gaUtils._trackEvent('Click', `Subscribe - ${visibleState}`);
    }
  }

  // Updates the state of the form based off the Header Store.
  // The central point of access to the value is in the Store.
  _onChange() {
    this.setState({subscribeFormVisible: Store._getSubscribeFormVisible()});
  }
}

// Set Component's Default Properties
// In ES6 properties cannot be defined in classes, only methods.
/* Default Component Properties */
SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: '#'
};

const styles = {
  base: {
    margin: '0px 15px',
    position: 'relative',
    display: 'inline-block'
  },
  SimpleButton: {
    display: 'block',
    padding: '9px 15px 11px 20px'
  },
  SubscribeIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '5px',
    display: 'inline'
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '250px',
    minHeight: '210px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

export default Radium(SubscribeButton);
