import React from 'react';
import PropTypes from 'prop-types';

import Books from '../Books/Books.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import BookStore from '../../stores/BookStore.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {}

  render() {
    const annualList = !!(this.props.params && this.props.params.type &&
      (this.props.params.type === 'childrens' || this.props.params.type === 'ya'));
    let mobileAboutLink = null;

    if (annualList) {
      mobileAboutLink = (
        <div className="mobile-about">
          <span className="mobile-about-divider"></span>
          <h2 className="mobile-about-link">
            <a href="http://nypl.org/books-music-dvds/recommendations/about/annual-lists">
              About this list
            </a>
          </h2>
        </div>
      );
    }

    return (
      <div>
        <div className="main-container">
          <div id="sidebar">
            <Sidebar {...this.state} annualList={annualList} />
          </div>
          <div id="books">
            <Books {...this.props} annualList={annualList} />
          </div>

          {mobileAboutLink}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  filters: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
};

export default App;
