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
  }

};
