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

  setIsJsEnabled(bool) {
    return bool;
  }

  setSelectedFilter(filterId, active) {
    return [filterId, active];
  }

  setSelectableFilters(filters) {
    return filters;
  }
}

export default alt.createActions(Actions);
