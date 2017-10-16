import { union as _union } from 'underscore';

import appConfig from '../../../appConfig.js';
import { gaUtils } from 'dgx-react-ga';

function Utils() {
  const unionFn = appTags => (newTags) => _union(appTags, newTags);

  this.metaTagUnion = unionFn(appConfig.metaTags);

  /**
   * trackPicks(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {string} action Action for GA event.
   * @param {string} label Label for GA event.
   */
  this.trackPicks = gaUtils.trackEvent('Staff Picks');
}

export default new Utils();
