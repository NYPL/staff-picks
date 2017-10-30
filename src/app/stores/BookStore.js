import alt from '../alt';

import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      updatePicks: BookActions.UPDATE_PICKS,
      updateFilters: BookActions.UPDATE_FILTERS,
      setSelectableFilters: BookActions.SET_SELECTABLE_FILTERS,
    });

    this.state = {
      filters: [],
      currentPicks: {},
      selectableFilters: [],
    };
  }

  updatePicks(currentPicks) {
    this.setState({ currentPicks });
  }
  updateFilters(filters) {
    this.setState({ filters });
  }
  setSelectableFilters(selectableFilters) {
    this.setState({ selectableFilters });
  }
}

export default alt.createStore(BookStore, 'BookStore');
