import axios from 'axios';

import appConfig from '../../../appConfig.js';
import dataSet from '../../../test2017Data.js';
import utils from '../../app/utils/utils';

const {
  baseUrl,
  baseAnnualUrl,
} = appConfig;

/* annualCurrentData
 * Get the latest annual staff pick list for either childrens or ya.
 */
function annualCurrentData(type, req, res, next) {
  const endpoint = `${baseAnnualUrl}api`;
  // Get the subset of tags that the picks can be filtered by.
  const selectableFilters = utils.getSelectableTags(dataSet.picks);

  res.locals.data = {
    BookStore: {
      filters: [
        'Adventure',
        'Animals',
        'Biographies',
        'Culturally diverse',
        'Early readers',
        'Fairy tales & folklore',
        'Families',
        'Fantasy',
        'Friendship',
        'Funny',
        'Graphic novels',
        'Historical',
        'Middle grade',
        'Nature',
        'Offbeat',
        'Picture books',
        'Poetry',
        'Science fiction',
        'STEM',
        'Suspenseful',
        'True stories',
      ],
      currentPicks: dataSet,
      selectableFilters,
      isJsEnabled: false,
    },
    endpoint,
  };

  return next();

  // axios.get(endpoint)
  //   .then((data) => {
  //     console.log(data);
  //     res.locals.data = {
  //       BookStore: {
  //         filters: [],
  //         currentPicks: data,
  //       },
  //       endpoint,
  //     };
  //
  //     next();
  //   })
  //   // console error messages
  //   .catch(error => {
  //     console.log(`Error calling API AnnualCurrentData: ${error}`);
  //     res.locals.data = {
  //       BookStore: {
  //         filters: [],
  //         currentPicks: {},
  //       },
  //       endpoint,
  //     };
  //     next();
  //   }); // end Axios call
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
