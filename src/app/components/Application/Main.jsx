import React from 'react';
import PropTypes from 'prop-types';

import BookList from '../BookList/BookList.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import utils from '../../utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectableFilters: this.props.selectableFilters,
      selectedFilters: this.props.selectedFilters,
      picks: this.props.currentMonthPicks.picks,
    };

    this.setSelectedFilter = this.setSelectedFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  getNewPickSet(picks, selectedFilters) {
    if (!selectedFilters.length) {
      return picks;
    }

    return picks.filter(book => {
      // Get the pick's tags in an ID readable array
      const tagArray = utils.getPickTags(book);
      // Get the array of selected tags found in the book item
      const inSelectedFilter = utils.getSelectedTags(tagArray, selectedFilters);

      if (inSelectedFilter.length &&
          (inSelectedFilter.length === selectedFilters.length)) {
        return book;
      }

      return undefined;
    });
  }

  setSelectedFilter(filterId, active) {
    let selectedFilters = [];

    if (active) {
      selectedFilters = this.state.selectedFilters.concat(filterId);
    } else {
      selectedFilters = this.state.selectedFilters.filter(f => f !== filterId);
    }

    const picks = this.getNewPickSet(this.props.currentMonthPicks.picks, selectedFilters);
    const selectableFilters = utils.getSelectableTags(picks);

    this.setState({
      selectableFilters,
      picks,
      selectedFilters,
    });
  }

  clearFilters() {
    const selectedFilters = [];
    const picks = this.getNewPickSet(this.props.currentMonthPicks.picks, selectedFilters);
    const selectableFilters = utils.getSelectableTags(picks);
    this.setState({
      selectableFilters,
      picks,
      selectedFilters,
    });
  }

  render() {
    return (
      <div className="nypl-row">
        <Sidebar
          filters={this.props.filters}
          selectableFilters={this.state.selectableFilters}
          setSelectedFilter={this.setSelectedFilter}
          clearFilters={this.clearFilters}
        />

        <BookList
          picks={this.state.picks}
          selectedFilters={this.state.selectedFilters}
          setSelectableFilters={this.setSelectableFilters}
        />
      </div>
    );
  }
}

App.propTypes = {
  filters: PropTypes.array,
  selectedFilters: PropTypes.array,
  selectableFilters: PropTypes.array,
  currentMonthPicks: PropTypes.object,
};

export default App;
