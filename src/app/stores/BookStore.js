import alt from 'dgx-alt-center';

import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      clearFilters: BookActions.CLEAR_FILTERS,
      updatePicks: BookActions.UPDATE_PICKS,
      updateInitialFilters: BookActions.UPDATE_INITIAL_FILTERS,
    });

    this.state = {
      filters: [],
      currentMonthPicks: {},
    };
  }

  clearFilters() {
    this.setState({ filters: [] });
  }
  updatePicks(currentMonthPicks) {
    this.setState({ currentMonthPicks });
  }
  updateInitialFilters(filters) {
    this.setState({ filters });
  }
}

export default alt.createStore(BookStore, 'BookStore');
