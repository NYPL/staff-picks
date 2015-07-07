import React from 'react';
import Radium from 'radium';
import InputField from '../InputField/InputField.jsx';

class EmailSubscribeForm extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    this._validateForm = this._validateForm.bind(this);
  }

  render () {
    return (
    	<form 
      ref='EmailSubscribeForm'
    	id={this.props.id}
      className={this.props.className}
    	action={this.props.target} 
    	method={this.props.form_method}
    	name={this.props.form_name}
      onSubmit={this._validateForm}
      style={[
        styles.base,
        this.props.style,
        this.props.display ? styles.display : styles.hide
      ]}>
        <div className='EmailSubscribeForm-fields'>
          <InputField type='hidden' name='thx' value='http://pages.email.nypl.org/confirmation' />
          <InputField type='hidden' name='err' value='http://pages.email.nypl.org/confirmation' />
          <InputField type='hidden' name='SubAction' value='sub_add_update' />
          <InputField type='hidden' name='MID' value='7000413' />
          <InputField type='hidden' name='Email Type' value='HTML' />
          <InputField type='hidden' name='lid' value='1061' />
          
          <InputField 
          type='email'
          name='Email Address'
          placeholder={this.props.placeholder}
          style={styles.emailField}
          ref='emailAddressField'
          required={true} />

          <InputField 
          type='submit'
          name='submit'
          value='Sign Up'
          style={styles.submitButton} />

          <InputField type='hidden' name='Source Code' value='Homepage' />
        </div>
        <a href={this.props.policyUrl}
        className='EmailSubscribeForm-pp-link'
        style={styles.privacyLink}>
          Privacy Policy
        </a>
      </form>
    );
  }

  _validateForm (e) {
    let userInput = React.findDOMNode(this.refs.emailAddressField);

    if (!this._isValidEmail(userInput.value)) {
      // Prevent re-direct, handle validation
      e.preventDefault();
      userInput.value = '';
      userInput.placeholder = 'Ops, invalid e-mail try again.';
      //userInput.style.backgroundColor = '#f7d4d4';
      //userInput.style.border = '1px solid #E43534';
      userInput.focus();

    } else {
      // Send as a normal POST
      //userInput.style.border = '1px solid green';
      return true;
    }
  }

  _isValidEmail (value) {
    const emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
    if (!value) { return false; }
    return emailRegex.test(value);
  }
};

/* Default Component Properties */
EmailSubscribeForm.defaultProps = {
  id: 'EmailSubscribeForm',
  className: 'EmailSubscribeForm',
  lang: 'en',
  target: 'http://cl.exct.net/subscribe.aspx',
  form_name: 'subscribeForm',
  form_method: 'POST',
  placeholder: 'Get the best of NYPL in your inbox!',
  policyUrl: 'http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy'
};

const styles = {
  base: {
    backgroundColor: '#EEE',
    padding: '10px',
    width: 'auto'
  },
  display: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  emailField: {
    display: 'table-cell',
    padding: '5px',
    height: '35px',
    margin: '0',
    width: '230px',
    fontSize: '12.5px',
    border: 'none'
  },
  submitButton: {
    display: 'table-cell',
    backgroundColor: '#666',
    border: 'none',
    color: 'white',
    height: '35px',
    width: '74px',
    margin: '0 0 0 5px',
    fontSize: '13px' 
  },
  privacyLink: {
    textDecoration: 'underline',
    display: 'inline-block',
    margin: '10px 0 0 0',
    fontSize: '9px',
    color: '#a5a5a5',
    fontWeight: '200'
  }
};

export default Radium(EmailSubscribeForm);