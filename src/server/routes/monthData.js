import nyplApiClient from '../helper/nyplApiClient.js';

const nyplApiClientGet = (endpoint) =>
  nyplApiClient().then(client => client.get(endpoint, { cache: false }));

/* currentMonthData
 * Get the default/latest monthly staff pick list.
 */
function currentMonthData(req, res, next) {
  res.locals.data = {
    BookStore: {
      filters: [],
      currentPicks: {},
      selectableFilters: [],
      isJsEnabled: false,
    },
  };
  next();
}

/* selectMonthData
 * Get a specific month's or season's staff pick list.
 */
function selectMonthData(req, res, next) {
  res.locals.data = {
    BookStore: {
      filters: [],
      currentPicks: {},
      selectableFilters: [],
      isJsEnabled: false,
    },
  };
  next();
}

/* selectClientMonthData
 * Get a specific month's or season's staff pick list on the client side.
 */
function selectClientMonthData(req, res, next) {
  // nyplApiClientGet(`/book-lists/staff-picks/${req.params.month}`)
  nyplApiClientGet('/book-lists/staff-picks/2017-01')
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      // We need to log here for catching the errors from /book-lists
      res.json({
        statusCode: error.statusCode,
        errorMessage: error.code,
      });
    });
}


/* annualCurrentData
 * Get the latest annual staff pick list for either childrens or ya.
 */
function annualCurrentData(type, req, res, next) {
  const pageTitle = appConfig.pageTitle[type];
  const metaTags = appConfig.metaTags[type];
  let dataType = '';

  if (type === 'childrens') {
    dataType = 'kids';
  } else if (type === 'ya') {
    dataType = 'teens';
  }

  nyplApiClientGet(`/book-lists/${dataType}/2017`)
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
        pageTitle,
        metaTags,
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

export default {
  currentMonthData,
  selectMonthData,
  selectClientMonthData,
};
