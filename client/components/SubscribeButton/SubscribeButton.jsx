import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import EmailSubscribeForm from '../EmailSubscribeForm/EmailSubscribeForm.jsx';

import HeaderStore from '../../stores/HeaderStore';
import HeaderActions from '../../actions/HeaderActions';

class SubscribeButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state, replaces getInitialState() method
    this.state = {
      subscribeFormVisible: HeaderStore.getSubscribeFormVisible()
    };

    // Allows binding methods that reference this
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount () {
    HeaderStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    HeaderStore.removeChangeListener(this._onChange.bind(this));
  }

  render () {
    // Assign a variable to hold the reference of state boolean
    //let showDialog = this.state.showDialog;
    let showDialog = this.state.subscribeFormVisible;
    // Dynamic class assignment based on boolean flag
    const classes =  cx({ show: showDialog, hide: !showDialog });

    console.log(this.state);

    return (
      <div className='SubscribeButton-Wrapper' ref='SubscribeButton' style={styles.base}>
        <SimpleButton
        className={'SubscribeButton'}
        lang={this.props.lang}
        label={this.props.label}
        target={this.props.target}
        onClick={this._handleClick}
        style={styles.SimpleButton} />

        <EmailSubscribeForm
        className={'EmailSubscribeForm up-arrow ' + classes}
        lang={this.props.lang}
        style={styles.EmailSubscribeForm}
        show={showDialog}
        display={showDialog} />
      </div>
    );
  }

  /* Utility Methods should be declared below the render method */
  _handleClick (event) {
    if(this.props.target === '') {
      event.preventDefault();
      // Toggle the Constant to show/hide the Subscribe Form
      if (HeaderStore.getSubscribeFormVisible() === false) {
        HeaderActions.updateSubscribeFormVisible(true);
      } else {
        HeaderActions.updateSubscribeFormVisible(false);
      }
    }
  }
  _onChange () {
    this.setState({subscribeFormVisible: HeaderStore.getSubscribeFormVisible()});
  }
}

// Set Component's Default Properties
// In ES6 properties cannot be defined in classes, only methods.
/* Default Component Properties */
SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: ''
};

const styles = {
  base: {
    margin: '0px 5px'
  },
  SimpleButton: {
    padding: '1em',
    display: 'block'
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1,
    right: '0px',
    width: '310px',
    backgroundColor: '#EDEDED',
    padding: '10px',
    margin: '5px 0 0 0'
  }
};

export default Radium(SubscribeButton);