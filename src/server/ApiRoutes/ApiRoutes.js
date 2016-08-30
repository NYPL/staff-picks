import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import { sortBy as _sortBy } from 'underscore';

import Model from 'dgx-model-data';
import PicksListModel from '../../app/utils/PicksListModel.js';

import config from '../../../appConfig.js';

const {
  apiEndpoint,
  fields,
  pageSize,
  includes,
  api,
} = config;

const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];
const options = {
  includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age'],
};

const router = express.Router();

function fetchApiData(url) {
  return axios.get(url);
}

function CurrentMonthData(req, res, next) {
  const endpoint = `${apiRoot}${apiEndpoint}?filter[list-type]=monthly&` +
    `${fields}${pageSize}${includes}`;

  axios.all([fetchApiData(endpoint)])
    .then(axios.spread((staffPicks) => {
      const returnedData = staffPicks.data;
      // Filters can be extracted without parsing since they are all in the
      // included array:
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        (item) => { return item.id; });
      // parse the data
      const parsed = parser.parse(returnedData, options);
      // Since the endpoint returns a list of monthly picks
      const currentMonth = parsed[0];
      const currentMonthPicks = PicksListModel.build(currentMonth);

      res.locals.data = {
        BookStore: {
          bookDisplay: 'grid',
          age: 'Adult',
          gridDisplay: true,
          listDisplay: false,
          allFilters: [],
          initialFilters: filters,
          filters: [],
          updatedFilters: [],
          isotopesDidUpdate: false,
          currentMonthPicks,
        },
        endpoint,
      };

      next();
    }))
    // console error messages
    .catch(error => {
      console.log(`Error calling API CurrentMonthData: ${error}`);
      res.locals.data = {
        BookStore: {
          bookDisplay: 'grid',
          age: 'Adult',
          gridDisplay: true,
          listDisplay: false,
          allFilters: [],
          initialFilters: [],
          filters: [],
          updatedFilters: [],
          currentMonthPicks: {},
          isotopesDidUpdate: false,
        },
        endpoint: '',
      };
      next();
    }); // end Axios call
}

function AnnualCurrentData(type, req, res, next) {
  const endpoint = `${apiRoot}${apiEndpoint}?filter[list-type]=${type}&` +
    `${fields}${pageSize}${includes}`;

  axios.all([fetchApiData(endpoint)])
    .then(axios.spread((staffPicks) => {
      const returnedData = staffPicks.data;
      // Filters can be extracted without parsing since they are all in the
      // included array:
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        item => item.id
      );
      // parse the data
      const parsed = parser.parse(returnedData, options);
      // Since the endpoint returns a list of monthly picks
      const currentMonth = parsed[0];
      const currentMonthPicks = PicksListModel.build(currentMonth);

      res.locals.data = {
        BookStore: {
          bookDisplay: 'grid',
          age: 'Adult',
          gridDisplay: true,
          listDisplay: false,
          allFilters: [],
          initialFilters: filters,
          filters: [],
          updatedFilters: [],
          isotopesDidUpdate: false,
          currentMonthPicks,
        },
        endpoint,
      };

      next();
    }))
    // console error messages
    .catch(error => {
      console.log(`Error calling API AnnualCurrentData: ${error}`);
      res.locals.data = {
        BookStore: {
          bookDisplay: 'grid',
          age: 'Adult',
          gridDisplay: true,
          listDisplay: false,
          allFilters: [],
          initialFilters: [],
          filters: [],
          updatedFilters: [],
          currentMonthPicks: {},
          isotopesDidUpdate: false,
        },
        endpoint: '',
      };
      next();
    }); // end Axios call
}

function SelectAnnualData(req, res, next) {
  const idOrType = req.params.idOrType;

  if (idOrType === 'childrens') {
    return AnnualCurrentData('c100', req, res, next);
  }

  if (idOrType === 'ya') {
    return AnnualCurrentData('ya100', req, res, next);
  }

  if (!idOrType !== 'childrens' || idOrType !== 'ya') {
    return res.redirect('/browse/recommendations/staff-picks/');
  }

  return CurrentMonthData(req, res, next);
}

function SelectMonthData(req, res, next) {
  const month = req.params.monthOrAnnual;
  const id = req.params.idOrType;
  const endpoint = `${apiRoot}${apiEndpoint}/monthly-${month}?${fields}${includes}`;

  if (month === 'browse' && id === 'recommendations') {
    return next();
  }

  if (month === 'annual') {
    return SelectAnnualData(req, res, next);
  }

  if (month === 'api') {
    return next();
  }

  if (!month.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
    return res.redirect('/browse/recommendations/staff-picks/');
  }

  axios.all([fetchApiData(endpoint)])
    .then(axios.spread((staffPicks) => {
      const returnedData = staffPicks.data;
      // Filters can be extracted without parsing since they are all in the
      // included array:
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        item => item.id
      );
      // parse the data
      const selectedMonth = parser.parse(returnedData, options);
      const currentMonthPicks = PicksListModel.build(selectedMonth);

      res.locals.data = {
        BookStore: {
          bookDisplay:  'grid',
          age: 'Adult',
          gridDisplay: true,
          listDisplay: false,
          allFilters: [],
          initialFilters: filters,
          filters: [],
          updatedFilters: [],
          isotopesDidUpdate: false,
          currentMonthPicks,
        },
        endpoint,
      };
      next();
    }))
    // console error messages
    .catch(error => {
      console.log(`Error calling API SelectMonthData: ${error}`);
      res.locals.data = {
        BookStore: {
          bookDisplay:  'grid',
          age: 'Adult',
          gridDisplay: true,
          listDisplay: false,
          allFilters: [],
          initialFilters: [],
          filters: [],
          updatedFilters: [],
          currentMonthPicks: {},
          isotopesDidUpdate: false,
        },
        endpoint: '',
      };
      next();
    }); /* end Axios call */
}

function AjaxData(req, res) {
  let month = req.params.month,
    endpoint = `${apiRoot}${apiEndpoint}/monthly-${month}?${fields}${includes}`;

  axios
    .get(endpoint)
    .then(data => {
      const returnedData = data.data;
      const selectedMonth = parser.parse(returnedData, options);
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        item => item.id
      );
      const currentMonthPicks = PicksListModel.build(selectedMonth);

      res.json({
        currentMonthPicks,
        filters,
        endpoint,
      });
    }); /* end axios call */
}

router
  .route('/')
  .get(CurrentMonthData);

router
  .route('/api/ajax/picks/:month')
  .get(AjaxData);

router
  .route('/browse/recommendations/staff-picks/')
  .get(CurrentMonthData);

router
  .route('/browse/recommendations/staff-picks/:monthOrAnnual/:idOrType?/:year?/:id?')
  .get(SelectMonthData);

router
  .route('/browse/recommendations/staff-picks/api/ajax/picks/:month')
  .get(AjaxData);

router
  .route('/:monthOrAnnual/:idOrType?/:year?/:id?')
  .get(SelectMonthData);

export default router;
