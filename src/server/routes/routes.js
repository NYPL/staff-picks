import express from 'express';

import monthData from './monthData.js';
import annualData from './annualData.js';
import config from '../../../appConfig.js';

const router = express.Router();
const { baseUrl } = config;

/* monthOrAnnual
 * Checks whether the route params dictate either an annual selection or a monthly selection.
 */
function monthOrAnnual(req, res, next) {
  const month = req.params.monthOrAnnual;
  const id = req.params.idOrType;

  if (month === 'books-music-dvds' && id === 'recommendations') {
    return next();
  }

  if (month === 'annual') {
    return annualData.selectAnnualData(req, res, next);
  }

  if (month === 'api') {
    return next();
  }

  if (!month.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
    return res.redirect(baseUrl);
  }

  // There are more matches if anything is added after the url slug
  if (id && id.match(/[0-9]*[-a-z]+/g).length > 1) {
    return res.redirect(baseUrl);
  }

  return monthData.selectMonthData(req, res, next);
}

router
  .route('/')
  .get(monthData.currentMonthData);

router
  .route('/api/ajax/picks/:month')
  .get(monthData.ajaxMonthData);

router
  .route(baseUrl)
  .get(monthData.currentMonthData);

router
  .route(`${baseUrl}:monthOrAnnual/:idOrType?/:year?/:id?`)
  .get(monthOrAnnual);

router
  .route(`${baseUrl}api/ajax/picks/:month`)
  .get(monthData.ajaxMonthData);

router
  .route('/:monthOrAnnual/:idOrType?/:year?/:id?')
  .get(monthOrAnnual);

export default router;
