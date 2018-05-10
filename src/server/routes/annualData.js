import nyplApiClient from '../helper/nyplApiClient';
import config from '../../../appConfig';

import utils from '../../app/utils/utils';
import platformConfig from '../../../platformConfig';
import modelListOptions from '../../app/utils/ModelListOptionsService';
import { matchListDate } from '../../app/utils/DateService';

const nyplApiClientGet = endpoint =>
  nyplApiClient().then(client => client.get(endpoint, { cache: false }));

/**
 * annualCurrentListData(req, res, next)
 * Get the latest annual staff pick list for either childrens or ya.
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function annualCurrentListData(req, res, next) {
  const listOptions = config.annualListOptions;
  const { type } = req.params;
  let seasonListOptions = [];
  let latestSeason = '';
  const dataType = utils.getDataType(type);

  nyplApiClientGet(platformConfig.endpoints.annualLists[dataType])
    .then((data) => {
      // Models the options based on the data returned
      const modeledOptionObject = modelListOptions(data, type);

      seasonListOptions = modeledOptionObject.options;
      latestSeason = modeledOptionObject.latestOption;

      // Updates default season list options with API response
      listOptions.season.options = seasonListOptions;

      // Calls the latest list
      return nyplApiClientGet(`${platformConfig.endpoints.annualPath}${dataType}/${latestSeason}`);
    })
    .then((data) => {
      const filters = utils.getAllTags(data.picks);
      // Get the subset of tags that the picks can be filtered by.
      const selectableFilters = utils.getSelectableTags(data.picks);

      // If error returned from the endpoint
      if (data.statusCode >= 400) {
        console.error(`Status Code: ${data.statusCode}, Error Message: ${data.error}`);

        return res.redirect(`${config.baseUrl}404`);
      }

      // Uodate the option lists' default values by the request params
      listOptions.season.currentValue = latestSeason;

      res.locals.data = {
        BookStore: {
          filters,
          picksData: data,
          selectableFilters,
          isJsEnabled: false,
          listOptions,
          currentSeason: latestSeason,
        },
        pageTitle: config.pageTitle[type],
        metaTags: config.metaTags[type],
      };

      next();
    })
    .catch((error) => {
      console.error(`Status Code: ${error.statusCode}, Error Message: ${error.code}`);

      return res.redirect(`${config.baseUrl}404`);
    });
}

/**
 * annualListData(req, res, next)
 * Get a specific month's or season's staff pick list.
 * It calls '/book-lists?type=staff-picks' to get all the available list options first.
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {object}
 */
function annualListData(req, res, next) {
  const listOptions = config.annualListOptions;
  let seasonListOptions = [];
  const { type } = req.params;
  const dataType = utils.getDataType(type);

  // Checks if the URL input fits season's convention
  const seasonMatches = matchListDate(req.params.time, type);
  // Default audience list is the adult list
  let requestedSeason = '';

  if (!seasonMatches) {
    console.error('Status Code: 400, Error Message: Invalid season or audience.');

    return res.redirect(`${config.baseUrl}404`);
  }

  // If the param fits season's convention, constructs the request param
  requestedSeason = seasonMatches[0];

  // The first request to get all the available list options
  nyplApiClientGet(platformConfig.endpoints.annualLists[`${dataType}`])
    .then((data) => {
      // Models the options based on the data returned
      const modeledOptionObject = modelListOptions(data, type);

      seasonListOptions = modeledOptionObject.options;

      // Updates default season list options with API response
      listOptions.season.options = seasonListOptions;

      // Calls the selected list
      return nyplApiClientGet(`${platformConfig.endpoints.annualPath}${dataType}/${requestedSeason}`);
    })
    .then((data) => {
      const filters = utils.getAllTags(data.picks);
      // Get the subset of tags that the picks can be filtered by.
      const selectableFilters = utils.getSelectableTags(data.picks);

      // If error returned from the endpoint
      if (data.statusCode >= 400) {
        console.error(`Status Code: ${data.statusCode}, Error Message: ${data.error}`);

        return res.redirect(`${config.baseUrl}404`);
      }

      // Uodate the option lists' default values by the request params
      listOptions.season.currentValue = requestedSeason;

      res.locals.data = {
        BookStore: {
          filters,
          picksData: data,
          selectableFilters,
          isJsEnabled: false,
          listOptions,
          currentSeason: requestedSeason,
        },
        pageTitle: config.pageTitle[type],
        metaTags: config.metaTags[type],
      };
      next();
    })
    .catch((error) => {
      console.error(`Status Code: ${error.statusCode}, Error Message: ${error.code}`);

      return res.redirect(`${config.baseUrl}404`);
    });
}

/**
 * annualClientListData(req, res, next)
 * Gets a specific month's or season's staff pick list on the client side.
 * @param {object} req
 * @param {object} res
 */
function annualClientListData(req, res) {
  const dataType = utils.getDataType(req.params.type);
  const seasonMatches = matchListDate(req.params.time, req.params.type);

  if (!seasonMatches) {
    console.error('Status Code: 400, Error Message: Invalid season.');

    res.json({
      statusCode: 400,
      errorMessage: 'Invalid season.',
    });
  }

  nyplApiClientGet(`${platformConfig.endpoints.annualPath}${dataType}/${seasonMatches[0]}`)
    .then((data) => {
      res.json({
        title: data.title,
        date: data.date,
        picksData: data,
      });
    })
    .catch((error) => {
      console.error(`Status Code: ${error.statusCode}, Error Message: ${error.code}`);

      res.json({
        statusCode: error.statusCode || 500,
        errorMessage: error.code,
      });
    });
}

export default {
  annualCurrentListData,
  annualListData,
  annualClientListData,
};
