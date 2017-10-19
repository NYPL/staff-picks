import express from 'express';

import monthData from './monthData.js';
import annualData from './annualData.js';
import appConfig from '../../../appConfig.js';

const router = express.Router();
const { baseUrl } = appConfig;

/* getMonthData
 */
function getMonthData(req, res, next) {
  const month = req.params.month;

  if (!month.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
    return res.redirect(baseUrl);
  }

  return monthData.selectMonthData(req, res, next);
}

router
  .route(appConfig.baseMonthUrl)
  .get(monthData.currentMonthData);

router
  .route(`${appConfig.baseMonthUrl}:month/:id?`)
  .get(getMonthData);

router
  .route(`${appConfig.baseAnnualUrl}:type/:year?/:id?`)
  .get(annualData.selectAnnualData);

router
  .route(`${appConfig.baseApiUrl}ajax/picks/:month`)
  .get(monthData.ajaxMonthData);

export default router;
