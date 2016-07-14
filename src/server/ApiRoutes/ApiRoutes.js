import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import { sortBy as _sortBy } from 'underscore';

import { navConfig } from 'dgx-header-component';
import Model from 'dgx-model-data';
import PicksListModel from '../../app/utils/PicksListModel.js';

import config from '../../../appConfig.js';

const { HeaderItemModel } = Model;
const {
  apiEndpoint,
  fields,
  pageSize,
  includes,
  api,
  headerApi,
} = config;

const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];
const options = {
  includes: ['previous-list', 'next-list', 'item.tags', 'picks.age'],
};
const headerOptions = {
  endpoint: `${apiRoot}${headerApi.endpoint}`,
  includes: headerApi.includes,
  filters: headerApi.filters,
};
const router = express.Router();

function fetchApiData(url) {
  return axios.get(url);
}

function getHeaderData() {
  const completeApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(completeApiUrl);
}

function CurrentMonthData(req, res, next) {
  const endpoint = `${apiRoot}${apiEndpoint}?filter[list-type]=monthly&` +
    `${fields}${pageSize}${includes}`;

  axios.all([getHeaderData(), fetchApiData(endpoint)])
    .then(axios.spread((headerData, staffPicks) => {
      const returnedData = staffPicks.data;
      // Filters can be extracted without parsing since they are all in the
      // included array:
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        (item) => { return item.id; });
      // parse the data
      const parsed = parser.parse(returnedData, options);
      const HeaderParsed = parser.parse(headerData.data, headerOptions);
        // Since the endpoint returns a list of monthly picks
      const currentMonth = parsed[0];
      const modelData = HeaderItemModel.build(HeaderParsed);
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
        HeaderStore: {
          headerData: navConfig.current,
          subscribeFormVisible: false,
          myNyplVisible: false,
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
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        endpoint: '',
      };
      next();
    }); // end Axios call
}

function AnnualCurrentData(type, req, res, next) {
  const endpoint = `${apiRoot}${apiEndpoint}?filter[list-type]=${type}&` +
    `${fields}${pageSize}${includes}`;

  axios.all([getHeaderData(), fetchApiData(endpoint)])
    .then(axios.spread((headerData, staffPicks) => {
      const returnedData = staffPicks.data;
      // Filters can be extracted without parsing since they are all in the
      // included array:
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        item => item.id
      );
      // parse the data
      const parsed = parser.parse(returnedData, options);
      const HeaderParsed = parser.parse(headerData.data, headerOptions);
      // Since the endpoint returns a list of monthly picks
      const currentMonth = parsed[0];
      const modelData = HeaderItemModel.build(HeaderParsed);
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
        HeaderStore: {
          headerData: navConfig.current,
          subscribeFormVisible: false,
          myNyplVisible: false,
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
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false,
          myNyplVisible: false,
        },
        endpoint: '',
      };
      next();
    }); // end Axios call
}

function SelectAnnualData(req, res, next) {
  if (req.params.idOrType === 'childrens') {
    return AnnualCurrentData('c100', req, res, next);
  }

  if (req.params.idOrType === 'ya') {
    return AnnualCurrentData('ya100', req, res, next);
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

  axios.all([getHeaderData(), fetchApiData(endpoint)])
    .then(axios.spread((headerData, staffPicks) => {
      const returnedData = staffPicks.data;
      // Filters can be extracted without parsing since they are all in the
      // included array:
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        item => item.id
      );
      // parse the data
      const selectedMonth = parser.parse(returnedData, options);
      const HeaderParsed = parser.parse(headerData.data, headerOptions);
      const modelData = HeaderItemModel.build(HeaderParsed);
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
        HeaderStore: {
          headerData: navConfig.current,
          subscribeFormVisible: false,
          myNyplVisible: false,
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
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false,
          myNyplVisible: false,
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
