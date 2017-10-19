import alt from 'dgx-alt-center';
import { indexOf as _indexOf } from 'underscore';

import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      clearFilters: BookActions.CLEAR_FILTERS,
      updateNewFilters: BookActions.UPDATE_NEW_FILTERS,
      updatePicks: BookActions.UPDATE_PICKS,
      updateInitialFilters: BookActions.UPDATE_INITIAL_FILTERS,
    });

    this.exportPublicMethods({
      getFilters: this.getFilters,
      getUpdatedFilters: this.getUpdatedFilters,
    });

    this.on('init', () => {
      this.allFilters = [];
      this.filters = [];
      this.initialFilters = [];
      this.updatedFilters = [];
      this.currentMonthPicks = {};
    });
  }

  clearFilters() {
    this.filters = [];
  }
  updateNewFilters(updatedFilters) {
    this.updatedFilters = updatedFilters;
  }
  updatePicks(picks) {
    this.currentMonthPicks = picks;
  }
  updateInitialFilters(filters) {
    this.initialFilters = filters;
  }

  getFilters() {
    return this.filters;
  }
  getUpdatedFilters() {
    return this.updatedFilters;
  }
}

export default alt.createStore(BookStore, 'BookStore');
