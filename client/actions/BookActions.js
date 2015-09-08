// ACTIONS
import alt from '../alt.js';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

class StaffPicks {
  updatePicks(picks) {
    this.dispatch(picks);
  }

  updateBookDisplay(displayType) {
    this.dispatch(displayType);
  }

  updateFilterAge(age) {
    this.dispatch(age);
  }

  toggleBookFilter(filter) {
    this.dispatch(filter);
  }

  clearFilters() {
    this.dispatch(true);
  }

  updateNewFilters(filters) {
    this.dispatch(filters);
  }

  isotopesDidUpdate(bool) {
    this.dispatch(bool);
  }
};

export default alt.createActions(StaffPicks);
