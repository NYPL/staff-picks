import express from 'express';

import monthData from './monthData';
import annualData from './annualData';
import appConfig from '../../../appConfig';

const router = express.Router();

// Not currently used in Best Books.
router
  .route(appConfig.baseMonthUrl)
  .get(monthData.currentMonthData);

// NOTE: The :year and :id params are currently not being used.
router
  .route(`${appConfig.baseAnnualUrl}:type/:year?/:id?`)
  .get(annualData.selectAnnualData);

// Not currently used in Best Books.
router
  .route(`${appConfig.baseApiUrl}:month/:id?`)
  .get(monthData.selectClientMonthData);

router
  .route(`${appConfig.baseMonthUrl}:month/:id?`)
  .get(monthData.selectMonthData);

export default router;
