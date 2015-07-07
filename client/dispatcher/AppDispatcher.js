import { Dispatcher } from 'flux';
// Create Dispatcher instance
const AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
// Notice the source is VIEW_ACTION, do not confuse
// with SERVER_ACTION as that is used to communicate
// with the server.
// We receive an action from an Action Creator and
// our Dispatcher will dispatch the action with the
// proper source and send the supplied action.
AppDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

export default AppDispatcher;
