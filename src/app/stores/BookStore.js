import alt from '../alt';

import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      updatePicks: BookActions.UPDATE_PICKS,
      updateFilters: BookActions.UPDATE_FILTERS,
      setIsJsEnabled: BookActions.SET_IS_JS_ENABLED,
      setSelectableFilters: BookActions.SET_SELECTABLE_FILTERS,
    });

    this.state = {
      filters: [],
      currentPicks: {},
      isJsEnabled: false,
      selectableFilters: [],
    };
  }

  updatePicks(currentPicks) {
    this.setState({ currentPicks });
  }

  updateFilters(filters) {
    this.setState({ filters });
  }

  setIsJsEnabled(bool) {
    this.setState({ isJsEnabled: bool });
  }

  setSelectableFilters(selectableFilters) {
    this.setState({ selectableFilters });
  }
}

export default alt.createStore(BookStore, 'BookStore');
