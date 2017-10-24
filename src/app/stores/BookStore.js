import alt from 'dgx-alt-center';

import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      clearFilters: BookActions.CLEAR_FILTERS,
      updatePicks: BookActions.UPDATE_PICKS,
      updateInitialFilters: BookActions.UPDATE_INITIAL_FILTERS,
      setSelectedFilter: BookActions.SET_SELECTED_FILTER,
    });

    this.state = {
      filters: [],
      currentMonthPicks: {},
      selectedFilters: [],
    };
  }

  clearFilters() {
    this.setState({ selectedFilters: [] });
  }
  updatePicks(currentMonthPicks) {
    this.setState({ currentMonthPicks });
  }
  updateInitialFilters(filters) {
    this.setState({ filters });
  }
  setSelectedFilter(argsArray) {
    const [filterId, active] = argsArray;
    let newFilters = [];

    if (active) {
      newFilters = this.state.selectedFilters.concat(filterId);
    } else {
      newFilters = this.state.selectedFilters.filter(f => f !== filterId);
    }

    this.setState({ selectedFilters: newFilters });
  }
}

export default alt.createStore(BookStore, 'BookStore');
