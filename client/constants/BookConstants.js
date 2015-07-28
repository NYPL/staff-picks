import keyMirror from 'react/lib/keyMirror';

/* Action Constants
* Used as global variables that get updated by
* application driven events. In conjuction with our Store
* Dispatcher, who emits these events. We use these constants
* as the single source of truth in our FLUX application.
*/
export default keyMirror({
  DISPLAY_TYPE: null,
  AGE_TYPE: null,
  FILTER: null,
  UPDATE_FILTERS: null
});
