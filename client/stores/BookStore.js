import EventEmitter from 'eventemitter3';
import AppDispatcher from '../dispatcher/AppDispatcher';
import BookConstants from '../constants/BookConstants';
import _ from 'underscore';

// Boolean flag that initially shows the style as grid and the age tab as adult
let _bookDisplay =  'grid',
    _age = 'Adult',
    _gridDisplay = true,
    _listDisplay = false,
    _filters = [];

// Simple reference to a repetitive non-changing string
const CHANGE_EVENT = 'change';

/* Setters are assigned in non-global scope */
// Sets the boolean value of the Subscribe Form Visibility
function setBookDisplay(bookDisplay) {
  _bookDisplay = bookDisplay;
}

function setActiveDisplay(type) {
  if (type === 'grid') {
    _gridDisplay = true;
    _listDisplay = false;
  } else {
    _gridDisplay = false;
    _listDisplay = true;
  }
}

function setAgeDisplay(age) {
  _age = age;
}

function setFilters(filter) {
  var found = _.indexOf(_filters, filter);

  if (found != -1) {
    _filters.splice(found, 1);
  } else {
    _filters.push(filter);
  }
}

function clearFilters() {
  _filters = [];
}

const BookStore = _.extend({}, EventEmitter.prototype, {
  // Gets the state of the Subscribe Form Visibility boolean
  getBookDisplay () {
    return _bookDisplay;
  },
  getActiveList() {
    return _listDisplay
  },
  getActiveGrid() {
    return _gridDisplay;
  },
  // Gets age from the tabs
  getAge () {
    return _age;
  },
  getFilters () {
    return _filters;
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

BookStore.dispatchToken = AppDispatcher.register((action) => {

  switch (action.actionType) {
    // Respond to DISPLAY_TYPE action
    case BookConstants.DISPLAY_TYPE:
      setActiveDisplay(action.displayType);
      setBookDisplay(action.displayType);
      BookStore.emitChange();
    break;

    case BookConstants.AGE_TYPE:
      setAgeDisplay(action.age);
      BookStore.emitChange();
    break;

    case BookConstants.FILTER:
      if (action.clear) {
        clearFilters();
      } else {
        setFilters(action.filter);
      }
      BookStore.emitChange();
    break;
    
    default:
    // Do nothing
  }
});

export default BookStore;
