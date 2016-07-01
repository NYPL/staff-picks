import ga from 'react-ga';

function GAUtils() {
  /**
   * trackGeneralEvent(category)
   * Track a GA event.
   *
   * @param {category} String Category for GA event.
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this.trackGeneralEvent = (category, action, label) => (
    ga.event({
      category,
      action,
      label,
    })
  );


  /**
   * trackEvent(category)
   * Track a GA click event, wrapped in a curried function.
   *
   * @param {category} String Category for GA event.
   * @returns {function} Returns a function with the category set.
   *  Then you pass in the action and the label.
   */
  this.trackEvent = category => {
    return (action, label) => {
      return ga.event({
        category,
        action,
        label,
      });
    };
  };
}

export default new GAUtils();
