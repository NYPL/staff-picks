// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
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

  updateInitialFilters(filters) {
    this.dispatch(filters);
  }
};

export default alt.createActions(Actions);
