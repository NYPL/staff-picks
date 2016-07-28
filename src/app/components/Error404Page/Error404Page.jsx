import React from 'react';

class Error404Page extends React.Component {
  render() {
    return (
      <div className="error-container">
        <h1 className="error-title">We&#39;re sorry...</h1>
        <p>
          The page you requested is either unavailable or you need permission to view the content.
        </p>
        <p>
          If you can&#39;t find the page you&#39;re looking for, please try our
          <a href="http://www.nypl.org/ask-nypl">
            ASK NYPL
          </a>
          service.
        </p>
      </div>
    );
  }
}

export default Error404Page;
