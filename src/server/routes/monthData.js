import axios from 'axios';
import parser from 'jsonapi-parserinator';
import { sortBy as _sortBy } from 'underscore';

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

/* currentMonthData
 * Get the default/latest monthly staff pick list.
 */
function currentMonthData(req, res, next) {
  const endpoint = `${apiRoot}${apiEndpoint}?filter[list-type]=monthly&` +
    `${fields}${pageSize}${includes}`;

  axios.get(endpoint)
    .then((staffPicks) => {
      const returnedData = staffPicks.data;
      // Filters can be extracted without parsing since they are all in the
      // included array:
      const filters = _sortBy(
        parser.getOfType(returnedData.included, 'staff-pick-tag'),
        (item) => item.id);
      // parse the data
      const parsed = parser.parse(returnedData, options);
      // Since the endpoint returns a list of monthly picks
      const currentMonth = parsed[0];
      const currentMonthPicks = PicksListModel.build(currentMonth);

      res.locals.data = {
        BookStore: {
          age: 'Adult',
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
    })
    // console error messages
    .catch(error => {
      console.log(`Error calling API currentMonthData: ${error}`);
      res.locals.data = {
        BookStore: {
          age: 'Adult',
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

/* selectMonthData
 * Get a specific month's or season's staff pick list.
 */
function selectMonthData(req, res, next) {
  const month = req.params.month;
  const endpoint = `${apiRoot}${apiEndpoint}/monthly-${month}?${fields}${includes}`;

  axios.get(endpoint)
    .then((staffPicks) => {
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
    })
    // console error messages
    .catch(error => {
      console.log(`Error calling API selectMonthData: ${error}`);
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
    }); /* end Axios call */
}

/* ajaxMonthData
 * Get a specific month's or season's staff pick list and return JSON for ajax requests.
 */
function ajaxMonthData(req, res) {
  const month = req.params.month;
  const endpoint = `${apiRoot}${apiEndpoint}/monthly-${month}?${fields}${includes}`;

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

export default {
  ajaxMonthData,
  currentMonthData,
  selectMonthData,
};
