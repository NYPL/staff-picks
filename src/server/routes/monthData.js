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
  res.json({test: 'this is a test'});
}

export default {
  currentMonthData,
  selectMonthData,
  selectClientMonthData,
};
