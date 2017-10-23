import React from 'react';
import PropTypes from 'prop-types';

import BookList from '../BookList/BookList.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

const App = (props) => (
  <div className="nypl-row">
    <Sidebar filters={props.filters} />

    <BookList
      currentMonthPicks={props.currentMonthPicks}
      selectedFilters={props.selectedFilters}
    />
  </div>
);

App.propTypes = {
  filters: PropTypes.array,
  selectedFilters: PropTypes.array,
  currentMonthPicks: PropTypes.object,
};

export default App;
