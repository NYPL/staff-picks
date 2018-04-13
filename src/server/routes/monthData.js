import nyplApiClient from '../helper/nyplApiClient.js';

const nyplApiClientGet = (endpoint) =>
  nyplApiClient().then(client => client.get(endpoint, { cache: false }));

/* currentMonthData
 * Get the default/latest monthly staff pick list.
 */
function currentMonthData(req, res, next) {
  // only 2017-01 works currently. Comment out the dynamice API link below
  // nyplApiClientGet(`/book-lists/staff-picks/${req.params.month}`)
  nyplApiClientGet('/book-lists/staff-picks/2017-01')
    .then(data => {
      res.locals.data = {
        BookStore: {
          filters: [],
          currentPicks: data,
          selectableFilters: [],
          isJsEnabled: false,
        },
        pageTitle: '',
        metaTags: [],
      };

      next();
    })
    .catch(error => {
      console.error(`Status Code: ${error.statusCode}, Error Message: ${error.code}`);

      res.locals.data = {
        BookStore: {
          filters: [],
          currentPicks: {},
          selectableFilters: [],
          isJsEnabled: false,
        },
      };

      next();
    });
}

/* selectMonthData
 * Get a specific month's or season's staff pick list.
 */
function selectMonthData(req, res, next) {
  // only 2017-01 works currently. Comment out the dynamice API link below
  // nyplApiClientGet(`/book-lists/staff-picks/${req.params.month}`)
  nyplApiClientGet('/book-lists/staff-picks/2017-01')
    .then(data => {
      res.locals.data = {
        BookStore: {
          filters: [],
          currentPicks: data,
          selectableFilters: [],
          isJsEnabled: false,
        },
        pageTitle: '',
        metaTags: [],
      };

      next();
    })
    .catch(error => {
      console.error(`Status Code: ${error.statusCode}, Error Message: ${error.code}`);

      res.locals.data = {
        BookStore: {
          filters: [],
          currentPicks: {},
          selectableFilters: [],
          isJsEnabled: false,
        },
      };

      next();
    });
}

/**
 * selectClientMonthData(req, res, next)
 * Gets a specific month's or season's staff pick list on the client side.
 */
function selectClientMonthData(req, res) {
  // only 2017-01 works currently. Comment out the dynamice API link below
  // nyplApiClientGet(`/book-lists/staff-picks/${req.params.month}`)
  nyplApiClientGet('/book-lists/staff-picks/2017-01')
    .then(data => {
      res.json({
        title: data.title,
        date: data.date,
        currentPicks: {
          picks: data.picks,
        },
      });
    })
    .catch(error => {
      console.error(`Status Code: ${error.statusCode}, Error Message: ${error.code}`);

      res.json({
        statusCode: error.statusCode,
        errorMessage: error.code,
      });
    });
}

export default {
  currentMonthData,
  selectMonthData,
  selectClientMonthData,
};
