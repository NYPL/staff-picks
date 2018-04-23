import express from 'express';

import monthData from './monthData';
import annualData from './annualData';
import appConfig from '../../../appConfig';

const router = express.Router();

// Type detection between best books and staff picks.
router
  .route(`${appConfig.baseUrl}:type/:time?/:id?`)
  .get(annualData.selectAnnualData);

// API route used in Best Books.
router
  .route(`${appConfig.baseApiUrl}:month/:id?`)
  .get(monthData.selectClientMonthData);


export default router;
