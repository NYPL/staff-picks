// ACTIONS
import alt from '../alt.js';

class StaffPicks {
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
};

export default alt.createActions(StaffPicks);
