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
      initialFilters: [],
      currentMonthPicks: {},
    };
  }

  clearFilters() {
    this.setState({ initialFilters: [] });
  }
  updatePicks(currentMonthPicks) {
    this.setState({ currentMonthPicks });
  }
  updateInitialFilters(initialFilters) {
    this.setState({ initialFilters });
  }
}

export default alt.createStore(BookStore, 'BookStore');
