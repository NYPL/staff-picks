import monthData from './monthData';
import annualData from './annualData';
import appConfig from "../../../appConfig";

const { baseUrl } = appConfig;

/* selectData
 * Map the url param to specific endpoint requests. Redirect otherwise to the homepage.
 */
function selectData(req, res, next) {
  const type = req.params.type;
  const time = req.params.time;

  if (type === 'childrens' || type === 'ya') {
    if (time !== undefined) {
      // TODO: Need to find function specific to calling annual data set.
    }
    return annualData.annualCurrentData(type, req, res, next);
  }

  if (type === 'staff-picks') {
    if (time !== undefined) {
      console.log('Running monthData.selectMonthData');
      return monthData.selectMonthData(req, res, next);
    }
    return monthData.currentMonthData(req, res, next);
  }

  return res.redirect(baseUrl);
}

export default {
  selectData,
};
