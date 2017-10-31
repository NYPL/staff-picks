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
      selectedFilters: [],
      picks: this.props.currentPicks.picks,
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

  /**
   * setSelectedFilter(filterId, active)
   * Adds or removes the selected filter's ID from the selectedFilters array which keeps track
   * of all active IDs. It then uses that array of IDs to filter down the list of
   * filters that are selectable.
   * @param {string} filterId
   * @param {boolean} active
   */
  setSelectedFilter(filterId, active) {
    let selectedFilters = [];

    if (active) {
      selectedFilters = this.state.selectedFilters.concat(filterId);
    } else {
      selectedFilters = this.state.selectedFilters.filter(id => id !== filterId);
    }

    const picks = this.getNewPickSet(this.props.currentPicks.picks, selectedFilters);
    const selectableFilters = utils.getSelectableTags(picks);

    this.setState({
      selectableFilters,
      picks,
      selectedFilters,
    });
  }

  /**
   * clearFilters()
   * Reset the list of picks and set the list of filters back to its initial state.
   */
  clearFilters() {
    const selectedFilters = [];
    const picks = this.getNewPickSet(this.props.currentPicks.picks, selectedFilters);
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
          isJsEnabled={this.props.isJsEnabled}
          selectedFilters={this.state.selectedFilters}
          picksCount={this.state.picks.length}
        />

        <BookList
          picks={this.state.picks}
          setSelectableFilters={this.setSelectableFilters}
          isJsEnabled={this.props.isJsEnabled}
        />
      </div>
    );
  }
}

App.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  currentPicks: PropTypes.object,
  isJsEnabled: PropTypes.bool,
};

export default App;
