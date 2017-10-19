// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updatePicks(picks) {
    return picks;
  }

  toggleBookFilter(filter) {
    return filter;
  }

  clearFilters() {
    return true;
  }

  updateNewFilters(filters) {
    return filters;
  }

  updateInitialFilters(filters) {
    return filters;
  }
}

export default alt.createActions(Actions);
