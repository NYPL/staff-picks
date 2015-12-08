import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {apiRoot, apiEndpoint, fields, pageSize, includes, api, headerApi} from '../../../appConfig.js';
import HeaderModel from '../../app/utils/HeaderItemModel.js';
import PicksListModel from '../../app/utils/PicksListModel.js';

let router = express.Router(),
  appEnvironment = process.env.APP_ENV || 'production',
  headerApiRoot = api.root[appEnvironment],
  options = {
    includes: ['previous-list', 'next-list', 'item.tags', 'picks.age']
  },
  headerOptions = {
    endpoint: `${headerApiRoot}${headerApi.endpoint}`,
    includes: headerApi.includes,
    filters: headerApi.filters
  };

function getHeaderData() {
  let completeApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(completeApiUrl);
}

function fetchApiData(url) {
  return axios.get(url);
}

function CurrentMonthData(req, res, next) {
  let endpoint = apiRoot + apiEndpoint + '?' + fields + pageSize + includes; 

  axios.all([getHeaderData(), fetchApiData(endpoint)])
    .then(axios.spread((headerData, staffPicks) => {
      let returnedData = staffPicks.data,
        // Filters can be extracted without parsing since they are all in the
        // included array:
        filters = parser.getOfType(returnedData.included, 'staff-pick-tag'),
        // parse the data
        parsed = parser.parse(returnedData, options),
        HeaderParsed = parser.parse(headerData.data, headerOptions),
        // Since the endpoint returns a list of monthly picks
        currentMonth = parsed[0],
        modelData = HeaderModel.build(HeaderParsed),
        currentMonthPicks = PicksListModel.build(currentMonth);

      res.locals.data = {
        BookStore: {
          _bookDisplay:  'grid',
          _age: 'Adult',
          _gridDisplay: true,
          _listDisplay: false,
          _allFilters: [],
          _initialFilters: filters,
          _filters: [],
          _updatedFilters: [],
          _currentMonthPicks: currentMonthPicks,
          _isotopesDidUpdate: false
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false,
          myNyplVisible: false
        }
      };

      next();
    }))
    // console error messages
    .catch(error => {
      console.log('Error calling API CurrentMonthData: ' + error);
      res.locals.data = {
        BookStore: {
          _bookDisplay:  'grid',
          _age: 'Adult',
          _gridDisplay: true,
          _listDisplay: false,
          _allFilters: [],
          _initialFilters: [],
          _filters: [],
          _updatedFilters: [],
          _currentMonthPicks: {},
          _isotopesDidUpdate: false
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false,
          myNyplVisible: false
        }
      };
      next();
    }); // end Axios call
}

function selectChildrens(req, res, next) {

  if (req.params.id === 'childrens') {
    // console.log('childrens');
  }

  if (req.params.id === 'ya') {
    // console.log('ya');
  }

  return CurrentMonthData(req, res, next);
}

function SelectMonthData(req, res, next) {
  let month = req.params.month,
    endpoint = apiRoot + apiEndpoint + `/monthly-${month}?` + fields + includes;

  if (month === 'annual') {
    return selectChildrens(req, res, next);
  }

  axios.all([getHeaderData(), fetchApiData(endpoint)])
    .then(axios.spread((headerData, staffPicks) => {
      let returnedData = staffPicks.data,
        // Filters can be extracted without parsing since they are all in the
        // included array:
        filters = parser.getOfType(returnedData.included, 'staff-pick-tag'),
        // parse the data
        selectedMonth = parser.parse(returnedData, options),
        HeaderParsed = parser.parse(headerData.data, headerOptions),
        modelData = HeaderModel.build(HeaderParsed),
        currentMonthPicks = PicksListModel.build(selectedMonth);

      res.locals.data = {
        BookStore: {
          _bookDisplay:  'grid',
          _age: 'Adult',
          _gridDisplay: true,
          _listDisplay: false,
          _allFilters: [],
          _initialFilters: filters,
          _filters: [],
          _updatedFilters: [],
          _currentMonthPicks: currentMonthPicks,
          _isotopesDidUpdate: false
        },
        HeaderStore: {
          headerData: modelData,
          subscribeFormVisible: false,
          myNyplVisible: false
        }
      };
      next();
    }))
    // console error messages
    .catch(error => {
      console.log('Error calling API SelectMonthData: ' + error);
      res.locals.data = {
        BookStore: {
          _bookDisplay:  'grid',
          _age: 'Adult',
          _gridDisplay: true,
          _listDisplay: false,
          _allFilters: [],
          _initialFilters: [],
          _filters: [],
          _updatedFilters: [],
          _currentMonthPicks: {},
          _isotopesDidUpdate: false
        },
        HeaderStore: {
          headerData: [],
          subscribeFormVisible: false,
          myNyplVisible: false
        }
      };
      next();
    }); /* end Axios call */
}

function AjaxData(req, res) {
  let month = req.params.month,
    endpoint = apiRoot + apiEndpoint + `/monthly-${month}?` + fields + includes;

  axios
    .get(endpoint)
    .then(data => {
      let returnedData = data.data,
        selectedMonth = parser.parse(returnedData, options),
        filters = parser.getOfType(returnedData.included, 'staff-pick-tag'),
        currentMonthPicks = PicksListModel.build(selectedMonth);

      res.json({
        currentMonthPicks: currentMonthPicks,
        filters: filters
      });
    }); /* end axios call */
}

router
  .route('/')
  .get(CurrentMonthData);

router
  .route('/annual/*')
  .get(selectChildrens);

router
  .route('/:month/:id?')
  .get(SelectMonthData);


router
  .route('/api/ajax/picks/:month')
  .get(AjaxData);

router
  .route('/browse/recommendations/staff-picks/')
  .get(CurrentMonthData);

router
  .route('/browse/recommendations/staff-picks/annual/*')
  .get(selectChildrens);

router
  .route('/browse/recommendations/staff-picks/:month/:id?')
  .get(SelectMonthData);

router
  .route('/browse/recommendations/staff-picks/api/ajax/picks/:month')
  .get(AjaxData);


export default router;
