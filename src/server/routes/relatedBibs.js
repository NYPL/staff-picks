import appConfig from '../../../appConfig.js';
import utils from '../../app/utils/utils';

import nyplApiClient from '../helper/nyplApiClient.js';

const { baseUrl } = appConfig;

const nyplApiClientGet = (endpoint) =>
  nyplApiClient().then(client => client.get(endpoint, { cache: false }));

/* annualCurrentData
 * Get the latest annual staff pick list for either childrens or ya.
 */
function getBibs(req, res, next) {
  const id = req.params.id || '';
  nyplApiClientGet(`/bibs/sierra-nypl/${id}/related-bibs`)
    .then(data => {
      res.locals.data = {
        BookStore: {
          filters: [],
          currentPicks: {},
          selectableFilters: [],
          isJsEnabled: false,
          relatedBibs: data,
        },
        pageTitle: '',
        metaTags: [],
      };

      next();
    })
    .catch(error => {
      console.log(`Error fetching endpoint: ${error}`);

      res.locals.data = {
        BookStore: {
          filters: [],
          currentPicks: {},
          selectableFilters: [],
          isJsEnabled: false,
        },
        pageTitle: '',
        metaTags: [],
      };

      next();
    })
}

export default { getBibs };
