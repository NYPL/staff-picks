import React from 'react';
import PropTypes from 'prop-types';

import Books from '../Books/Books.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

const App = (props) => (
  <div>
    <div className="main-container">
      <div id="sidebar">
        <Sidebar filters={props.filters} />
      </div>
      <div id="books">
        <Books currentMonthPicks={props.currentMonthPicks} />
      </div>

      <div className="mobile-about">
        <span className="mobile-about-divider"></span>
        <h2 className="mobile-about-link">
          <a href="http://nypl.org/books-music-dvds/recommendations/about/annual-lists">
            About this list
          </a>
        </h2>
      </div>
    </div>
  </div>
);

App.propTypes = {
  filters: PropTypes.array,
  currentMonthPicks: PropTypes.object,
};

export default App;
