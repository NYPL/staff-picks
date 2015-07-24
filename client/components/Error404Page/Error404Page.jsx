import React from 'react';
import Radium from 'radium';

class Error404Page extends React.Component {

	// Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render () {
  	return (
      <div className='error-container' style={styles.ErrorContainer}>
        <h1 style={styles.ErrorTitle}>We&#39;re sorry...</h1>
        <p style={styles.ErrorContent}>The page you requested is either unavailable or you need permission to view the content.</p>
        <p style={styles.ErrorContent}>If you can&#39;t find the page you&#39;re looking for, please try our <a href='http://www.nypl.org/ask-nypl' style={styles.ErrorContentLink}>ASK NYPL</a> service.</p>
      </div>
		);
  }
}

const styles = {
  ErrorContainer: {
    '@media (min-width: 767px) and (max-width: 1023px)': { padding: '10rem 0 0 0', margin: '0 10% 20rem 10%' },
    '@media (min-width: 480px) and (max-width: 766px)': { padding: '10rem 0 0 0', margin: '0 10% 20rem 10%', width: '30%' },
    '@media (max-width: 479px)': { padding: '10rem 0 0 0', margin: '0 24% 20rem 24%' },
    color: '#36322D',
    margin: '5rem 0 20rem 0'
  },
  ErrorTitle: {
    fontSize: '2.4rem',
    lineHeight: '1em',
    margin: '0 0 0.5em 0'
  },
  ErrorContent: {
    fontSize: '1.4rem',
    margin: '1em 0 1em 0',
  },
  ErrorContentLink: {
    color: '#36322D'
  }
};

export default Radium(Error404Page);