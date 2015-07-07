import keyMirror from 'react/lib/keyMirror';

/* Action Constants
* Used as global variables that get updated by
* application driven events. In conjuction with our Store
* Dispatcher, who emits these events. We use these constants
* as the single source of truth in our FLUX application.
*/
export default keyMirror({
	// Controls the visibility of the subscribe form
  SUBSCRIBE_FORM_VISIBLE: null,
	// Controls the visibility of the SSO Window (might need to be altered)
  SSO_WINDOW_VISIBLE: null,
  // Loads our mock data
	RECEIVE_DATA: null
});
