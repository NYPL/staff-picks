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

  setSelectedFilter(filterId, active) {
    return [filterId, active];
  }
}

export default alt.createActions(Actions);
