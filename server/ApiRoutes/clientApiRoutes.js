import axios from 'axios';
import parser from 'jsonapi-parserinator';

function clientAPI(app) {
  app.get('/api/ajax/picks/:month', (req, res) => {
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
          currentMonthPicks = {
            id: selectedMonth.id,
            picks: selectedMonth.picks,
            date: selectedMonth.attributes['list-date'],
            // Update previous/next object to include ID
            previousList: selectedMonth['previous-list'] ? selectedMonth['previous-list'].attributes : {},
            nextList: selectedMonth['next-list'] ? selectedMonth['next-list'].attributes : {}
          };

        res.json(currentMonthPicks);
      });
  });
}

export default clientAPI;
