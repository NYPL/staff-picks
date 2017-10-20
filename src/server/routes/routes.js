import express from 'express';

import monthData from './monthData.js';
import annualData from './annualData.js';
import appConfig from '../../../appConfig.js';
import dataSet from '../../../test2017Data.js';

const router = express.Router();

router
  .route(`${appConfig.baseAnnualUrl}api`)
  .get((req, res) => {
    res.json(dataSet);
  });

router
  .route(appConfig.baseMonthUrl)
  .get(monthData.currentMonthData);

router
  .route(`${appConfig.baseMonthUrl}:month/:id?`)
  .get(monthData.selectMonthData);

router
  .route(`${appConfig.baseAnnualUrl}:type/:year?/:id?`)
  .get(annualData.selectAnnualData);

export default router;
