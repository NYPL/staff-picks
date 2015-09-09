import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

let router = express.Router();

function getCurrentMonth(req, res, next) {
  let options = {
    endpoint: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri&page[size]=1&include=previous-list,next-list,picks.item.tags,picks.age',
    includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age']
  };

  parser.setChildrenObjects(options);

  axios
    .get(options.endpoint)
    .then(data => {
      let returnedData = data.data,
        // Filters can be extracted without parsing since they are all in the
        // included array:
        filters = parser.getOfType(returnedData.included, 'staff-pick-tag'),
        // parse the data
        parsed = parser.parse(returnedData),
        // Since the endpoint returns a list of monthly picks
        currentMonth = parsed[0],
        // Create the Model for a pick but this will eventually be in a separate file
        currentMonthPicks = {
          id: currentMonth.id,
          picks: currentMonth.picks,
          date: currentMonth.attributes['list-date'],
          // Update previous/next object to include ID
          previousList: currentMonth['previous-list'] ? currentMonth['previous-list'].attributes : {},
          nextList: currentMonth['next-list'] ? currentMonth['next-list'].attributes : {}
        };

      res.locals.data = {
        'BookStore': {
          _bookDisplay:  'grid',
          _age: 'Adult',
          _gridDisplay: true,
          _listDisplay: false,
          _allFilters: [],
          _initialFilters: filters,
          _filters: [],
          _updatedFilters: [],
          _currentMonthPicks: currentMonthPicks,
          _isotopesDidUpdate: false
        }
      };
      next();
    }); /* end Axios call */
}

function selectMonth(req, res, next) {
  let options = {
    endpoint: `http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists/monthly-${req.params.month}?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri&include=previous-list,next-list,picks.item.tags,picks.age`,
    includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age']
  };

  parser.setChildrenObjects(options);

  axios
    .get(options.endpoint)
    .then(data => {
      let returnedData = data.data,
        // Filters can be extracted without parsing since they are all in the
        // included array:
        filters = parser.getOfType(returnedData.included, 'staff-pick-tag'),
        // parse the data
        selectedMonth = parser.parse(returnedData),
        // Create the Model for a pick but this will eventually be in a separate file
        currentMonthPicks = {
          id: selectedMonth.id,
          picks: selectedMonth.picks,
          date: selectedMonth.attributes['list-date'],
          // Update previous/next object to include ID
          previousList: selectedMonth['previous-list'] ? selectedMonth['previous-list'].attributes : {},
          nextList: selectedMonth['next-list'] ? selectedMonth['next-list'].attributes : {}
        };

      res.locals.data = {
        "BookStore": {
          _bookDisplay:  'grid',
          _age: 'Adult',
          _gridDisplay: true,
          _listDisplay: false,
          _allFilters: [],
          _initialFilters: filters,
          _filters: [],
          _updatedFilters: [],
          _currentMonthPicks: currentMonthPicks,
          _isotopesDidUpdate: false
        }
      };
      next();
    }); /* end Axios call */
}

router
  .route('/')
  .get(getCurrentMonth);

router
  .route('/recommendations/staff-picks/')
  .get(getCurrentMonth);

router
  .route('/:month')
  .get(selectMonth);

router
  .route('/recommendations/staff-picks/:month')
  .get(selectMonth);

router
  .route('/api/ajax/picks/:month')
  .get((req, res) => {
    let options = {
        endpoint: `http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists/monthly-${req.params.month}?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri&include=previous-list,next-list,picks.item.tags,picks.age`,
        includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age']
      };

    parser.setChildrenObjects(options);

    axios
      .get(options.endpoint)
      .then(data => {
        let returnedData = data.data,
          selectedMonth = parser.parse(returnedData),
          filters = parser.getOfType(returnedData.included, 'staff-pick-tag'),
          currentMonthPicks = {
            id: selectedMonth.id,
            picks: selectedMonth.picks,
            date: selectedMonth.attributes['list-date'],
            // Update previous/next object to include ID
            previousList: selectedMonth['previous-list'] ? selectedMonth['previous-list'].attributes : {},
            nextList: selectedMonth['next-list'] ? selectedMonth['next-list'].attributes : {}
          };

        res.json({
          currentMonthPicks: currentMonthPicks,
          filters: filters
        });
      });
  });

export default router;
