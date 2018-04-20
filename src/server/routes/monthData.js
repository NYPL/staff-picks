import nyplApiClient from '../helper/nyplApiClient';
import config from '../../../appConfig';
import utils from '../../app/utils/utils';

const nyplApiClientGet = (endpoint) =>
  nyplApiClient().then(client => client.get(endpoint, { cache: false }));

/* currentMonthData
 * Get the default/latest monthly staff pick list.
 */
function currentMonthData(req, res, next) {
  // only 2017-01 works currently. Comment out the dynamice API link below
  // nyplApiClientGet(`/book-lists/staff-picks/${req.params.month}`)
  nyplApiClientGet('/book-lists/staff-picks/2017-06-01')
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
  const {
    month,
    itemId,
  } = req.params;

  nyplApiClientGet(`/book-lists/staff-picks/${month}`)
    .then((data) => {
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
        pageTitle: '',
        metaTags: [],
      };

      next();
    })
    .catch((error) => {
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
  nyplApiClientGet('/book-lists/staff-picks/2017-06-01')
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
        statusCode: error.statusCode || 500,
        errorMessage: error.code,
      });
    });
}

/**
 * selectClientMonthDataPost(req, res, next)
 * Handles the requests from the form submit button (when no JS).
 * It redirects to the route to execute the function for server side requesting.
 */
function selectMonthDataFormPost(req, res) {
  const season = (req.body.season) ? `${req.body.season}` : '';
  const audience = req.body.audience;

  if (!season || !audience) {
    console.log(
      `Form data of season or audience is undefined. season: ${season}, audience: ${audience}`
    );
  }

  res.redirect(
    `${config.baseMonthUrl}${season}`
  );
}

export default {
  currentMonthData,
  selectMonthData,
  selectClientMonthData,
  selectMonthDataFormPost,
};
