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
  .route(`${appConfig.baseApiUrl}`)
  .post(monthData.selectMonthDataFormPost);

// The route for client side API request of Staff Picks
router
  .route(`${appConfig.baseApiUrl}:month/:id?`)
  .get(monthData.selectClientMonthData);


// The route for server side API request of Staff Picks
router
  .route(`${appConfig.baseMonthUrl}:month/:id?`)
  .get(monthData.selectMonthData);

// The route for main Staff Picks page
router
  .route(`${appConfig.baseMonthUrl}`)
  .get(monthData.currentMonthData);

export default router;
