import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import {apiRoot, apiEndpoint, fields, pageSize, includes, api, headerApi} from '../appConfig.js';
import Model from '../../client/utils/HeaderItemModel.js';

let router = express.Router(),
  appEnvironment = 'production',
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
        // Create the Model for a pick but this will eventually be in a separate file
        currentMonthPicks = {
          id: currentMonth.id,
          picks: currentMonth.picks,
          date: currentMonth.attributes['list-date'],
          // Update previous/next object to include ID
          previousList: currentMonth['previous-list'] ? currentMonth['previous-list'].attributes : {},
          nextList: currentMonth['next-list'] ? currentMonth['next-list'].attributes : {}
        },
        modelData = Model.build(HeaderParsed);

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

function SelectMonthData(req, res, next) {
  let month = req.params.month,
    endpoint = apiRoot + apiEndpoint + `/monthly-${month}?` + fields + includes;

  axios.all([getHeaderData(), fetchApiData(endpoint)])
    .then(axios.spread((headerData, staffPicks) => {
      let returnedData = staffPicks.data,
        // Filters can be extracted without parsing since they are all in the
        // included array:
        filters = parser.getOfType(returnedData.included, 'staff-pick-tag'),
        // parse the data
        selectedMonth = parser.parse(returnedData, options),
        // Create the Model for a pick but this will eventually be in a separate file
        currentMonthPicks = {
          id: selectedMonth.id,
          picks: selectedMonth.picks,
          date: selectedMonth.attributes['list-date'],
          // Update previous/next object to include ID
          previousList: selectedMonth['previous-list'] ? selectedMonth['previous-list'].attributes : {},
          nextList: selectedMonth['next-list'] ? selectedMonth['next-list'].attributes : {}
        },
        HeaderParsed = parser.parse(headerData.data, headerOptions),
        modelData = Model.build(HeaderParsed);

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
    }); // end Axios call
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
        currentMonthPicks = {
          id: selectedMonth.id,
          picks: selectedMonth.picks,
          date: selectedMonth.attributes['list-date'],
          // Update previous/next object to include ID
          previousList: selectedMonth['previous-list'] ? selectedMonth['previous-list'].attributes : {},
          nextList: selectedMonth['next-list'] ? selectedMonth['next-list'].attributes : {}
        };

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
  .route('/:month/:id?')
  .get(SelectMonthData);

router
  .route('/api/ajax/picks/:month')
  .get(AjaxData);

router
  .route('/recommendations/staff-picks/')
  .get(CurrentMonthData);

router
  .route('/recommendations/staff-picks/:month/:id?')
  .get(SelectMonthData);

router
  .route('/recommendations/staff-picks/api/ajax/picks/:month')
  .get(AjaxData);


export default router;
