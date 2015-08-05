import EventEmitter from 'eventemitter3';
import AppDispatcher from '../dispatcher/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';
import _ from 'underscore';

// Boolean flag that initially hides the Subscribe Form
let _subscribeFormVisible =  false;

// Simple reference to a repetitive non-changing string
const CHANGE_EVENT = 'change';

/* Setters are assigned in non-global scope */
// Sets the boolean value of the Subscribe Form Visibility
function setSubscribeFormVisible (subscribeFormVisible) {
  _subscribeFormVisible = subscribeFormVisible;
}

const HeaderStore = _.extend({}, EventEmitter.prototype, {
	// Gets the state of the Subscribe Form Visibility boolean
	getSubscribeFormVisible () {
		return _subscribeFormVisible;
	},
	// Emits change event to all registered event listeners
	emitChange () {
		return this.emit(CHANGE_EVENT);
  },
  // Register a new change event listener
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

HeaderStore.dispatchToken = AppDispatcher.register((payload) => {
	let action = payload.action;

	switch (action.actionType) {
		// Respond to SUBSCRIBE_FORM_VISIBLE action
		case HeaderConstants.SUBSCRIBE_FORM_VISIBLE:
			setSubscribeFormVisible(action.subscribeFormVisible);
			HeaderStore.emitChange();
		break;
		default:
    // Do nothing
	}
});

export default HeaderStore;
