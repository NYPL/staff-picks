import moment from 'moment';
import { union as _union } from 'underscore';

import appConfig from '../../../appConfig.js';
import gaUtils from './gaUtils.js';

function Utils() {
  const unionFn = appTags => {
    return newTags => _union(appTags, newTags);
  };

  this.metaTagUnion = unionFn(appConfig.metaTags);

  this.formatDate = (startDate, endDate) => {
    let formattedDate;
    const numDaysBetween = (start, end) => {
      const s = moment(start);
      const e = moment(end);
      return e.diff(s, 'days');
    };
    const dateToString = (start, end, type) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      let dateString;

      if (!start && !end) {
        return;
      }

      // String assignment based on type
      switch (type) {
        case 'current':
          dateString = `Open now. Ends ${months[end.getUTCMonth()]}` +
            ` ${end.getUTCDate()}, ${end.getUTCFullYear()}.`;
          break;
        case 'current-ongoing':
          dateString = 'Open now. Ongoing.';
          break;
        case 'upcoming':
          dateString = `Opening soon. ${months[start.getUTCMonth()]}` +
            ` ${start.getUTCDate()}, ${start.getUTCFullYear()}` +
            ` - ${months[end.getUTCMonth()]} ${end.getUTCDate()}` +
            `, ${end.getUTCFullYear()}.`;
          break;
        case 'upcoming-ongoing':
          dateString = `Opening soon. ${months[start.getUTCMonth()]}` +
            ` ${start.getUTCDate()}, ${start.getUTCFullYear()}.`;
          break;
        default:
          dateString = `${months[start.getUTCMonth()]} ${start.getUTCDate()}` +
            `, ${start.getUTCFullYear()} - ${months[end.getUTCMonth()]}` +
            ` ${end.getUTCDate()}, ${end.getUTCFullYear()}.`;
      }
      return dateString;
    };

    if (startDate && endDate) {
      const sDate = new Date(startDate);
      const eDate = new Date(endDate);
      const today = new Date();
      const daysBetweenStartEnd = numDaysBetween(sDate, eDate);
      const rangeLimit = 365;

      // Current Event and not past 1 year between start and end dates.
      if (sDate.getTime() <= today.getTime()
        && eDate.getTime() >= today.getTime()
        && daysBetweenStartEnd < rangeLimit
        && daysBetweenStartEnd > 0) {
        formattedDate = dateToString(sDate, eDate, 'current');
      }
      // Current Event and past 1 year which implies Ongoing
      else if (sDate.getTime() <= today.getTime()
        && eDate.getTime() >= today.getTime()
        && daysBetweenStartEnd > rangeLimit) {
        formattedDate = dateToString(sDate, eDate, 'current-ongoing');
      }
      // Upcoming Event and not past 1 year between start and end dates.
      else if (sDate.getTime() > today.getTime()
        && eDate.getTime() >= today.getTime()
        && daysBetweenStartEnd < rangeLimit
        && daysBetweenStartEnd > 0) {
        formattedDate = dateToString(sDate, eDate, 'upcoming');
      }
      // Upcoming Event and past 1 year which implies Ongoing.
      else {
        formattedDate = dateToString(sDate, eDate, 'upcoming-ongoing');
      }
    }

    return formattedDate;
  };

  /**
   * trackHeader(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this.trackHeader = gaUtils.trackEvent('Global Header');

  /**
   * trackPicks(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this.trackPicks = gaUtils.trackEvent('Staff Picks');
}

export default new Utils();
