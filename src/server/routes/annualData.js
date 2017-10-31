import appConfig from '../../../appConfig.js';
import utils from '../../app/utils/utils';

import nyplApiClient from '../helper/nyplApiClient.js';

const { baseUrl } = appConfig;

const nyplApiClientGet = (endpoint) =>
  nyplApiClient().then(client => client.get(endpoint, { cache: false }));

/* annualCurrentData
 * Get the latest annual staff pick list for either childrens or ya.
 */
function annualCurrentData(type, req, res, next) {
  // Hard coded endpoint for now
  nyplApiClientGet('/book-lists/kids/2017-11')
    .then(data => {
      const filters = utils.getAllTags(data.picks);
      // Get the subset of tags that the picks can be filtered by.
      const selectableFilters = utils.getSelectableTags(data.picks);

      res.locals.data = {
        BookStore: {
          filters,
          currentPicks: data,
          selectableFilters,
          isJsEnabled: false,
        },
      };

      next();
    })
    .catch(error => {
      console.log(`Error fetching endpoint: ${error}`);
    })
}

/* selectAnnualData
 * Map the url param to specific endpoint requests. Redirect otherwise to the homepage.
 */
function selectAnnualData(req, res, next) {
  const type = req.params.type;

  if (type === 'childrens') {
    return annualCurrentData('c100', req, res, next);
  }

  if (type === 'ya') {
    return annualCurrentData('ya100', req, res, next);
  }

  return res.redirect(baseUrl);
}

export default {
  selectAnnualData,
};
