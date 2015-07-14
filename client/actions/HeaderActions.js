import AppDispatcher from '../dispatcher/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';

export default {
	// Updates the visibility of the Subscribe Form
	// Dispatcher will update the App Constants
	updateSubscribeFormVisible(subscribeFormVisible) {
    AppDispatcher.handleAction({
			actionType: HeaderConstants.SUBSCRIBE_FORM_VISIBLE,
			subscribeFormVisible: subscribeFormVisible
		});
	}

};
