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
  baseUrl,
} = config;

const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];
const options = {
  includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age'],
};

/* annualCurrentData
 * Get the latest annual staff pick list for either childrens or ya.
 */
function annualCurrentData(type, req, res, next) {
  const endpoint = `${apiRoot}${apiEndpoint}?filter[list-type]=${type}&` +
    `${fields}${pageSize}${includes}`;

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
    })
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

/* selectAnnualData
 * Map the url param to specific endpoint requests. Redirect otherwise to the homepage.
 */
function selectAnnualData(req, res, next) {
  const idOrType = req.params.idOrType;

  if (idOrType === 'childrens') {
    return annualCurrentData('c100', req, res, next);
  }

  if (idOrType === 'ya') {
    return annualCurrentData('ya100', req, res, next);
  }

  return res.redirect(baseUrl);
}

export default {
  selectAnnualData,
  annualCurrentData,
};
