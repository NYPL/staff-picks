import React from 'react';
import Radium from 'radium';

class Error extends React.Component {

	// Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render () {
  	return (
      <div class='error-404'>
        <h1 style={styles.ErrorTitle}>We&#39;re sorry...</h1>
        <p style={styles.ErrorContent}>The page you requested is either unavailable or you need permission to view the content.</p>
        <p style={styles.ErrorContent}>If you can&#39;t find the page you&#39;re looking for, please try our <a href='http://www.nypl.org/ask-nypl'>ASK NYPL</a> service.</p>
      </div>
		);
  }
}

const styles = {
  ErrorTitle: {
    fontSize: '2.4rem'
  },
  ErrorContent: {
    fontSize: '1.4rem'
  }
};

export default Radium(Error);