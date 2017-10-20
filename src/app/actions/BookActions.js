// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updatePicks(picks) {
    return picks;
  }

  clearFilters() {
    return true;
  }

  updateInitialFilters(filters) {
    return filters;
  }
}

export default alt.createActions(Actions);
