import alt from 'dgx-alt-center';
import { indexOf as _indexOf } from 'underscore';

import BookActions from '../actions/BookActions';

class BookStore {
  constructor() {
    this.bindListeners({
      updateBookDisplay: BookActions.UPDATE_BOOK_DISPLAY,
      updateFilterAge: BookActions.UPDATE_FILTER_AGE,
      toggleBookFilter: BookActions.TOGGLE_BOOK_FILTER,
      clearFilters: BookActions.CLEAR_FILTERS,
      updateNewFilters: BookActions.UPDATE_NEW_FILTERS,
      updatePicks: BookActions.UPDATE_PICKS,
      isotopesDidUpdate: BookActions.ISOTOPES_DID_UPDATE,
      updateInitialFilters: BookActions.UPDATE_INITIAL_FILTERS,
    });

    this.exportPublicMethods({
      getBookDisplay: this.getBookDisplay,
      getActiveList: this.getActiveList,
      getActiveGrid: this.getActiveGrid,
      getAge: this.getAge,
      getFilters: this.getFilters,
      getUpdatedFilters: this.getUpdatedFilters,
      updateBookDisplay: this.updateBookDisplay,
    });

    this.on('init', () => {
      this.bookDisplay = 'grid';
      this.age = 'Adult';
      this.gridDisplay = true;
      this.listDisplay = false;
      this.allFilters = [];
      this.filters = [];
      this.initialFilters = [];
      this.updatedFilters = [];
      this.currentMonthPicks = {};
      this.isotopesDidUpdate = false;
    });
  }

  updateBookDisplay(bookDisplay) {
    this.bookDisplay = bookDisplay;
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

  // Maybe not needed?
  getBookDisplay() {
    return this.bookDisplay;
  }
  getActiveList() {
    return this.listDisplay;
  }
  getActiveGrid() {
    return this.gridDisplay;
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
  setActiveDisplay(type) {
    if (type === 'grid') {
      this.gridDisplay = true;
      this.listDisplay = false;
    } else {
      this.gridDisplay = false;
      this.listDisplay = true;
    }
  }
}

export default alt.createStore(BookStore, 'BookStore');
