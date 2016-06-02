import { seasons } from '../../../appConfig.js';
import {
  findKey as _findKey,
  contains as _contains,
} from 'underscore';

function monthOrSeason(month, year) {
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // Return the key where the month is found in that key's array.
  const season = _findKey(seasons, season => _contains(season, monthsArr[month]));

  if (year >= 2016) {
    return season;
  }

  return monthsArr[month];
}

function staffPicksDate(date) {
  if (!date) {
    return {month, year};
  }

  const d = date.match(/(\d{4})\-(\d{2})\-(\d{2})/);
  const newDate = new Date(d[1], d[2] - 1, d[3]);
  const year = newDate.getFullYear();
  const month = monthOrSeason(newDate.getMonth(), year);
 
  return {
    month,
    year
  };
};

export default staffPicksDate;
