// ACTIONS
import alt from 'dgx-alt-center';

class Actions {
  updatePicks(picks) {
    return picks;
  }

  updateFilterAge(age) {
    return age;
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

  isotopesDidUpdate(bool) {
    return bool;
  }

  updateInitialFilters(filters) {
    return filters;
  }
}

export default alt.createActions(Actions);
