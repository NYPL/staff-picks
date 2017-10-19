import alt from 'dgx-alt-center';
import { indexOf as _indexOf } from 'underscore';

import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      updateFilterAge: BookActions.UPDATE_FILTER_AGE,
      toggleBookFilter: BookActions.TOGGLE_BOOK_FILTER,
      clearFilters: BookActions.CLEAR_FILTERS,
      updateNewFilters: BookActions.UPDATE_NEW_FILTERS,
      updatePicks: BookActions.UPDATE_PICKS,
      isotopesDidUpdate: BookActions.ISOTOPES_DID_UPDATE,
      updateInitialFilters: BookActions.UPDATE_INITIAL_FILTERS,
    });

    this.exportPublicMethods({
      getAge: this.getAge,
      getFilters: this.getFilters,
      getUpdatedFilters: this.getUpdatedFilters,
    });

    this.on('init', () => {
      this.age = 'Adult';
      this.allFilters = [];
      this.filters = [];
      this.initialFilters = [];
      this.updatedFilters = [];
      this.currentMonthPicks = {};
      this.isotopesDidUpdate = false;
    });
  }

  updateFilterAge(age) {
    this.age = age;
  }
  toggleBookFilter(filter) {
    const found = _indexOf(this.filters, filter);

    if (found !== -1) {
      this.filters.splice(found, 1);
    } else {
      this.filters.push(filter);
    }
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
  isotopesDidUpdate(bool) {
    this.isotopesDidUpdate = bool;
  }
  updateInitialFilters(filters) {
    this.initialFilters = filters;
  }

  // Gets age from the tabs
  getAge() {
    return this.age;
  }
  getFilters() {
    return this.filters;
  }
  getUpdatedFilters() {
    return this.updatedFilters;
  }
}

export default alt.createStore(BookStore, 'BookStore');
