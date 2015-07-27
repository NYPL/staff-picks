import AppDispatcher from '../dispatcher/AppDispatcher';
import BookConstants from '../constants/BookConstants';

export default {
  updateBookDisplay(displayType) {
    AppDispatcher.dispatch({
      actionType: BookConstants.DISPLAY_TYPE,
      displayType: displayType
    });
  },

  updateFilterAge(age) {
		AppDispatcher.dispatch({
      actionType: BookConstants.AGE_TYPE,
      age: age
    });
  },

  toggleBookFilter(filter) {
    AppDispatcher.dispatch({
      actionType: BookConstants.FILTER,
      filter: filter
    });
  },

  clearFilters() {
    AppDispatcher.dispatch({
      actionType: BookConstants.FILTER,
      clear: true
    });
  },

  updateNewFilters(filters) {
    AppDispatcher.dispatch({
      actionType: BookConstants.UPDATE_FILTERS,
      newFilters: filters
    });
  }
};
